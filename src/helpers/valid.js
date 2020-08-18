//Validation helper
const { check } = require("express-validator");

//Signup Validation
exports.validSignup = [
  check("firstName", "First Name is required.").notEmpty(),
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password", "Password is required")
    .notEmpty()
    // .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$/)
    .withMessage(
      "Must contain atleast one lower case, one uppercase, one special character and one digit."
    ),
  check("confirmPassword", "Passwords do not match."),
  check("dob").trim().isDate().withMessage("Must be a valid date."),
  check("gender").isIn(["Male", "Female"]),
];

//Login Validation
exports.validLogin = [
    check('email').isEmail().withMessage('Must be a valid email address'),
    check('password', 'Password is required.').notEmpty()
];

//Forgot Password Validation
exports.forgotPasswordValidator = [
    check('email')
        .isEmail()
        .withMessage('Must be a valid email address')
];

//Reset Password Validation
exports.resetPasswordValidator = [
    check('newPassword', 'Password is required.')
    .notEmpty()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
    .withMessage(
      "Must contain atleast one lower case, one uppercase, one special character and one digit."
    ),
];