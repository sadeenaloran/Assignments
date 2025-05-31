import UserModel from "../models/usersModel.js";
import {
  registerSchema,
  loginSchema,
  changePasswordSchema,
} from "../utilities/validation.js";

const AuthController = {
  async register(req, res, next) {
    try {
      //{error, value} error if there is any problem in validation and value if all the data and validation is good.
      const { error, value } = registerSchema.validate(req.body); //validate function it's a function to compare the data in body with data that validated.   
      if (error) throw new Error(error.details[0].message); // details[]--> array that have details of the errors.
      
      // to get data
      const { email, password, name } = value;
     
      // to validate the data comes from body, in utilites validation file.
      // **** checks before registration ****
      // to ensure that no user in database has the same email
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) throw new Error("Email already in use");
      // throw error --> stop the processing in the other lines as BREAK.
      
      // to create user in database.
      const newUser = await UserModel.create({ email, password, name });
      // after registration --> to be a valid register user we need a token.
      const token = UserModel.generateToken(newUser.id); //id comes from create when we return row[0]
      // best user experience
      req.session.userId = newUser.id;
      req.session.authenticated = true; 

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "strict",
      });

      // to return response for the user.
      res.status(201).json({
        success: true,
        token: token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          createAt: newUser.create_at
        }, // not neccessary to return hashed password to the user.
      });
    } catch (error) {
      next(error); 
    }
  },

  // in login just we have Email and Password.
  async login(req, res, next) {
    try {
      const { error, value } = loginSchema.validate(req.body);
      if (error) throw new Error(error.details[0].message);
      
      const { email, password } = value;
      
      const user = await UserModel.findByEmail(email); // to get user that has this email.
      if (!user) throw new Error("Invalid Credantails");

      const isMatch = await UserModel.verifyPassword(password, user.password);
      if (!isMatch) throw new Error("Invalid password");
      // const token = UserModel.generateToken(user.id);

      // *****Create session*******
      req.session.userId = user.id;
      req.session.authenticated = true;
      const token = UserModel.generateToken(user.id);
      // to set token inside cokkie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "strict",
      });

      res.json({ //no status because there is no creation. 
        success: true,
        token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async changePassword(req, res, next) {
    try {
      const { error, value } = changePasswordSchema.validate(req.body);
      if (error) throw new Error(error.details[0].message);
     
      const { currentPassword, newPassword } = value;
     
      const user = await UserModel.findByEmail(req.user.eamail);
      if (!user) throw new Error("Invalid Credantails");
     
      const isMatch = await UserModel.verifyPassword(
        currentPassword, user.password);
      if (!isMatch) throw new Error("Current password is incorrect");
     
      await UserModel.updatePassword(user.id, newPassword);
      res.json({
        success: true,
        message: "password updated successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  async getCurrentLoginInfo(req, res, next) {
    try {
      const user = await UserModel.findById(req.user.id);
      if (!user) throw new Error("user not found");
      res.json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  },

  async logout(req, res, next) {
    try {
      req.session.destroy((err) => {
        if (err) throw err;
      });
      res.clearCookie("token");
      res.clearCookie("connect.sid");
      res.json({ success: true, message: "Logged out successfully" });
    } catch (error) {}
  },
};

export default AuthController;
