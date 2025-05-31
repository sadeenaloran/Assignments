// imports of packages that i will use.
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoute from "./routes/authRoutes.js";
import './config/db.js';
// import './config/dbS.js';

import session from "express-session";
import cookieParser from "cookie-parser";

// to make the backend application
const app = express();

// security middleware
app.use(helmet());
app.use(
  cors({
    // define origin and this origin will save cors or the domains that allowed to talk to the server or backend app.
    // to store this domains, i have to put this domains in dotenv file.
    //  here i define or make a whitelisted for Urls that allowed to talk with.
    origin: process.env.CORS_ORIGIN || '*',  // '*' --> to acess on all url in the system 

    // to define the methods that allowed to make call in the system, to prevent any attack in different methods.
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    //  to make the request that comes more secure, or more safe.
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// for loginig-->to log for all request that comes
// to determine or check on env that will work on-> to talk to morgan if will work combined or development
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// as a bodyparser package, but from express-> to parsse the packages.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// to call routes -> all of them APIs
app.use("/api/auth", authRoute);

// Put it at the end
app.use(cookieParser());

// middleware for session
app.use(
  session({
    // Falg -> when sening cookie --> send cookie when https to secure my data on production
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      // (number of Day Hours * 60 min * 60 sec * 1000)* number of days.
      maxAge: 24 * 60 * 60 * 1000, //1 day
      sameSite: "strict",
    },
  })
);

// Health check (trigger the connection with server) --> API to return json to tell that the server is running or not.
app.get("/health", (req, res) => res.json({ status: "OK" }));

// Error handling -> import the custom middleware in handler.
app.use(notFound);
app.use(errorHandler);

// to use the app inside the server.
export default app;
