const User = require("../model/users.model");
const expressJwt = require("express-jwt");
const _ = require("lodash");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
//Custom error handler for database errors
const { errorHandler } = require("../helpers/dbErrorHandling");
//Using nodemailer to send verification mails
const nodemailer = require("nodemailer");

exports.signupController = (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    dob,
    gender,
  } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    User.findOne({
      email,
    }).exec((err, user) => {
      //If user exists
      if (user) {
        return res.status(400).json({
          error: "Email is taken",
        });
      }
    });
    //Generate token
    const token = jwt.sign(
      {
        firstName,
        lastName,
        email,
        password,
        dob,
        gender,
      },
      process.env.JWT_ACCOUNT_ACTIVATION,
      {
        expiresIn: "15m",
      }
    );

    //Configuring nodemailer
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    //Message details here
    let mailDetails = {
      from: 'Navprayas',
      to: email,
      subject: "Account Activation Link",
      html: `
                <h1>Please use the following to activate your account</h1>
                <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                <hr />
                <p>This email may contain sensitive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `,
    };

    // send email from here
    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        return res.status(400).json({
          success: false,
          errors: errorHandler(err),
        });
      } else {
        return res.json({
          message: `Email has been sent to ${email}.`,
        });
      }
    });
  }
};

// Activation and save to db
exports.activationController = (req, res) => {
  const { token } = req.body;
  if (token) {
    //Verify the token if valid or not or expired
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          errors: "Token Expired. Please sign up again.",
        });
      } else {
        //if valid, save to database
        //Get email and password from token
        const {
          firstName,
          lastName,
          email,
          password,
          dob,
          gender,
        } = jwt.decode(token);
        console.log(email);
        const user = new User({
          firstName,
          lastName,
          email,
          password,
          dob,
          gender,
        });

        user.save((err, user) => {
          if (err) {
            console.log("Save error", errorHandler(err));
            return res.status(401).json({
              errors: errorHandler(err),
            });
          } else {
            return res.json({
              success: true,
              message: "Signup success",
              user,
            });
          }
        });
      }
    });
  } else {
    return res.json({
      message: "Error occurred. Please try again",
    });
  }
};

exports.loginController = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    // check if user exist
    User.findOne({
      email,
    }).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          errors: "User with that email does not exist. Please signup",
        });
      }
      // authenticate
      if (!user.authenticate(password)) {
        return res.status(400).json({
          errors: "Email and password do not match",
        });
      }
      // generate a token and send to client
      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      const { _id, firstName, lastName, email, dob, gender } = user;

      return res.json({
        token,
        user: {
          _id,
          firstName,
          lastName,
          email,
          dob,
          gender,
        },
      });
    });
  }
};
