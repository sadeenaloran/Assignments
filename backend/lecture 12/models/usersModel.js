import { query } from "../config/db.js";
// to hash the password
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// add the method inside object -> constructor function
// values will arrives from the controllers
const UserModel = {
  // when i put create inside UserModel -> when i use these modules inside the controller in easy way by -> UserModel.Function or method or query
  async create({ email, password, name }) {
    // these vaues will sent from controller (the one who resposible to Receive these values from client)
    //role not needed because i generate it with default value (user).
    try {
      // password will stored in database as a plain text, so we need to hashed it.
      // hash is a promise method -> async,so it's need to await.
      // bcrypt -> to hash the password.
      // with hash we neet to salt password.
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.BCRYPT_SALT_ROUNDS)
      );
      const { rows } = await query(
        //rows instead of result
        `INSERT INTO users (email,password,name) 
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [email, hashedPassword, name]
      );
      return rows[0];
    } catch (error) {
      if (error.code === "23505") {
        //email already exists in table in database.
        throw new Error("Email already exists");
      }
      throw error;
    }
  },

  // new method to find by email.
  async findByEmail(email) {
    try {
      const { rows } = await query(
        `SELECT * FROM users
         WHERE email = $1`,
        [email]
      );
      // query always return array.
      // if there no result in array -> not return undefined, it will return an empty array
      // so, we need to check on length of array.
      if (rows.length > 0) {
        return rows[0];
      }
    } catch (error) {
      throw error;
    }
  },
  // as get user by id--> when the system has users, so no need to try and catch here.
  async findById(id) {
    const { rows } = await query( // `SELECT * FROM users WHERE id = $1`,
      //custom query to return the right user with it's info (secure info)
      `SELECT id, email, name, role FROM users
         WHERE id = $1`,
      [id]
    ); // hashed password must not return
    return rows[0];
  },

  // these methods will be in utils folder in helper file if the project be bigger.
  generateToken(userId) {
    //to return token we need to userId, to generate token for user in specific.
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });
  },

  // method to verify the repeated password.
  async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  },

  async updatePassword(newPassword, userId) {
    const hashedNewPassword = bcrypt.hash(
      newPassword,
      parseInt(process.env.BCRYPT_SALT_ROUNDS)
    );
    await query(
      `
        UPDATE users SET password = $1 WHERE id = $2`,
      [hashedNewPassword, userId]
    );
  },
};

export default UserModel;
