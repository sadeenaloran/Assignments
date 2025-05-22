import { query } from "../config/db.js";
// to hash the password
import bcrypt from "bcryptjs";
import jwt, { verify } from "jsonwebtoken";

// object -> constructor function
// values will arrives from the controllers
const UserModel = {
  async create({ email, password, name }) {
    try {
      // hash is a promise method
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.BCRYPT_SALT_ROUNDS)
      );
      const { rows } = await query(
        `INSERT INTO users (email,password,name) 
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [email, hashedPassword, name]
      );
      return rows[0];
    } catch (error) {
      if (error.code === "23505") {
        throw new Error("Email already exists");
      }
      throw error;
    }
  },

  //   new method to find by email
  async findByEmail(email) {
    try {
      const { rows } = await query(
        `SELECT * FROM users
         WHERE email = $`,
        [email]
      );
      if (rows.length > 0) {
        return rows[0];
      } else {
        throw new Error("Email already exists");
      }
    } catch (error) {
      throw error;
    }
  },

  async findById(id) {
    const { rows } = await query(
      `SELECT * FROM users
         WHERE id = $`,
      [id]
    );
    return rows[0];
  },

  grnerateToken() {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });
  },
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
      [updatePassword, userId]
    );
  },
};

export default UserModel;