import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from "url";
import router from './routes/userRoutes.js';
// make sure the extension has .js for the files i import.

dotenv.config();
const app = express();

const__filename =fileURLToPath(import.meta.url);
const__dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname, '../public'));

// how to use routes inside server.js 
app.use('/',router)


// to run the app on port we determined
app.listen(process.env.PORT, () => {});
