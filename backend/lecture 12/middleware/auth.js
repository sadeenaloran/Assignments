// build and handle a custome middleware
import UserModel from "../models/usersModel.js";
import jwt from "jsonwebtoken"; //to extract from token that return the information to get id that found in this token.

// AUTHENTICATION custome middleware which is function that added in rout
export const authenticate = async (req, res, next) => {
  try {
    // to check in seesion if authenticated or not.
    if (req.session.authenticated && req.session.userId) {
      const user = await UserModel.findById(req.session.userId);
      if (user) {
        req.user = user;
        return next();
      }
    }

    // const authHeader = req.headers["authorization"];
    // const token = authHeader?.split(" ")[1]; //split--> to remove the first word (bearer).

    // to get token from cookie.
    const token = req.cookie.token;
    if (!token) throw new Error("Auth token missing");

    // decoded for the information.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);

    // must to do this -> to check if there is a user or not.
    if (!user) throw new Error("User not found");

    // Renew session
    req.session.userId = user.id;
    req.session.authenticated = true;

    // to generate new variable in the request same as req.user.id
    req.user = user;

    next();
  } catch (error) {
    error.statusCode = 401; // 401 -> user not authorized
    next(error);
  }
}; // like a Guard middleware to authorized user in the system.

// AUTHERIZATION custom middleware.
export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (roles.length && !roles.includes(req.user.role)) {
      const error = new Error("unauthorized axxess");
      error.statusCode = 403; //unauthorized Error
      return next(error);
    }
    next();
  };
};
