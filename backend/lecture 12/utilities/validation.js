// we make a custome methods to help in validate.
// library that helps in validation on the data and i can whith it make sum of patterns on specific text and it will take value to check if it validate or not.
import Joi from "joi";

// to register the data for the  user.
export const registerSchema = Joi.object({
  // variables needs to check.
  // max num must be <= the max num in database.
  // the attributes name must be the same attributes in the body.
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    )
    .message(
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
    )
    .required(),
});

// to login
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string() // must sure that newPassword not alternative of currentPassword.
    .min(8)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    )
    .required()
    .invalid(Joi.ref("currentPassword")) // for newpassword not match currentpassword.
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      "any.invalid": "New password cannot be the same as current password",
    }),
});
