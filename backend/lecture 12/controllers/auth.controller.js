import User from "../models/user.model.js";
import {
  registerSchema,
  loginSchema,
  changePasswordSchema,
} from "../utilities/validation.js";

const AuthController = {
  async register(req, res, next) {
    try {
      const { error, value } = registerSchema.validate(req.body);
      if (error) throw new Error(error.details[0].message);

      const { email, password, name } = value;
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) throw new Error("Email already in use");

      const newUser = await User.create({ email, password, name });
      const token = User.generateToken(newUser.id);

      res.status(201).json({
        success: true,
        token: token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { error, value } = loginSchema.validate(req.body);
      if (error) throw new Error(error.details[0].message);

      const { email, password } = value;

      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error("Invalid Credantails");
      // password from user object.
      const isMatch = await user.verifyPassword(password);

      if (!isMatch) throw new Error("Invalid password");
      const token = User.generateToken(user.id);
      res.json({
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

      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error("Invalid Credantails");

      const isMatch = await user.verifyPassword(currentPassword);
      if (!isMatch) throw new Error("Current password is incorrect");
     
      //   User.update({password: currentPassword}) - another way to update:
      user.password = newPassword;
      await user.save(); // to sync change on password in db.

      res.json({
        success: true,
        message: "password updated successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  // GetMe same getCurrentLoginInfo.
  async getCurrentLoginInfo(req, res, next) {
    try {
      const user = User.findByPk(req.user.id, {
        attributes: ["id", "name", "email", "role"],
      });

      if (!user) throw new Error("user not found");
      res.json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  },
};
