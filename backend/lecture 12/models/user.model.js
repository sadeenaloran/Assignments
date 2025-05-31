// the major change will be in models
import sequelize from "../config/dbS.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// to define user object.  //table in db --> USer
const User = sequelize.define(
  "User",
  {
    id: {
      // like i define object User that has all these attributes, these attributes must be in the same way that written in schema when we create tables.
      type: DataTypes.INTEGER,
      primaryKey: true, //boolean attribute
      autoIncrement: true, //ids serial
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true, len: [6, 255] },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // function set --> void method.
      //  in model all the opertions are sync operations.
      set(value) {
        const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT_ROUNDS));
        const hash = bcrypt.hashSync(value, salt);
        this.setDataValue("password", hash); //return to the nearest object -> User object
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 255],
      },
    },
  },
  { //configration in model options
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    // to trigger the operation
    hooks: {
      afterCreate: (user) => {
        user.password = undefined;
      },
      afterUpdate: (user) => {
        user.password = undefined;
      },
    },
  }
);

// verifyPassword --> instance method (async method or async func)
User.prototype.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// User.prototype.updatePassword = async function (newPassword) {
//    const hashedNewPassword = bcrypt.hash(
//       newPassword,
//       parseInt(process.env.BCRYPT_SALT_ROUNDS)
//     );};


// generateToken --> static method 
User.grnerateToken = function (userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
};


export default User;
