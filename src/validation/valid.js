//Validation helper
const { check } = require("express-validator");
import regeneratorRuntime from 'regenerator-runtime'

//Signup Validation
exports.validSignup = [
  check("firstName", "First Name is required.").notEmpty(),
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password", "Password is required")
    .trim()
    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&_])(?=\S+$).{8,20}$/)
    .withMessage(
      "The password must be 8 to 20 characters long and must contain atleast one lower case, one uppercase, one special character(@,#,$,%,&,_) and one digit."
    ),
  check("confirmPassword")
    .trim()
    .custom(async function(confirmPassword, { req }) {
      const password = req.body.password;
      if (password !== confirmPassword) {
        throw new Error("Password and Confirm Password do not match.");
      }
    }),
  check("dob")
    .trim()
    .isDate()
    .withMessage("Date should be in YYYY/MM/DD format"),
  check("gender").isIn(["Male", "Female", "Other", "Prefer Not to Say"]),
];

//Login Validation
exports.validLogin = [
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password", "Password is required.")
    .trim()
    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&_])(?=\S+$).{8,20}$/)
    .withMessage(
      "The password must be 8 to 20 characters long and must contain atleast one lower case, one uppercase, one special character(@,#,$,%,&,_) and one digit."
    ),
];

//Forgot Password Validation
exports.forgotPasswordValidator = [
  check("email").isEmail().withMessage("Must be a valid email address"),
];

//Reset Password Validation
exports.resetPasswordValidator = [
  check("newPassword", "Password is required.")
    .trim()
    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&_])(?=\S+$).{8,20}$/)
    .withMessage(
      "The password must be 8 to 20 characters long and must contain atleast one lower case, one uppercase, one special character(@,#,$,%,&,_) and one digit."
    )
];

// Change Password Validation
exports.changePasswordValidator = [
  check("oldPassword", "Old password is required")
  .trim()
  .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&_])(?=\S+$).{8,20}$/)
  .withMessage(
    "Old password was 8 to 20 characters long and had atleast one lower case, one uppercase, one special character(@,#,$,%,&,_) and one digit."
  ),
  check("newchangePassword", "Password is required.")
  .trim()
  .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&_])(?=\S+$).{8,20}$/)
  .withMessage(
    "The password must be 8 to 20 characters long and must contain atleast one lower case, one uppercase, one special character(@,#,$,%,&,_) and one digit."
  ),
  check("confirmchangePassword")
    .notEmpty()
    .withMessage("Confirm Password cannot be empty.")
    .trim()
    .custom(async function(confirmchangePassword, { req }) {
      const password = req.body.newchangePassword;
      if (password !== confirmchangePassword) {
        throw new Error("Password and Confirm Password do not match.");
      }
    }),
];
