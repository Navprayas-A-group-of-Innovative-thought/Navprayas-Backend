const User = require("../model/users.model");
const expressJwt = require("express-jwt");
const _ = require("lodash");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
//Custom error handler for database errors
const { errorHandler } = require("../helpers/dbErrorHandling");
//Using nodemailer to send verification mails
const nodemailer = require("nodemailer");

//Configuring nodemailer
let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD,
  },
});

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
      errorDetails: firstError,
    });
  } else {
    User.findOne({
      email,
    }).exec((err, user) => {
      //If user exists
      if (user) {
        return res.status(403).json({
          errorDetails: "User already exists",
        });
      }
    });
    //Generate token and send to client
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
        expiresIn: "30m",
      }
    );

    //Mail details here
    let mailDetails = {
      from: "Navprayas <navprayas@do_not_reply.com>",
      to: email,
      subject: "Email Verification - Navprayas",
      html: `
                <p>Hello ${firstName},</p>
                <p>Thank you for signing up on <a href="http://navprayas.in">Navprayas</a>.</p>
                <p>In order to activate your Navprayas account, we need to verify your email address. Please use the below link to confirm your email address and complete the signup process.<p>
                <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                <br>
                <p>Thanks and regards<br>Navprayas<br>(A Group of Innovative Thoughts)</p>
            `,
    };

    // send email from here
    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
          return res.status(451).json({
          errorDetails: errorHandler(err),
        });
      } else {
          return res.status(250).json({
          responseData: `Email has been sent to ${email}.`,
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
          errorDetails: "Token Expired. Please sign up again.",
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

          const user = new User({
            firstName,
            lastName,
            email,
            password,
            dob,
            gender,
          });
          user.otherDetails.emailVerified = true
          user.save((err, user) => {
            if (err) {
              console.log("Save error", errorHandler(err));
              return res.status(500).json({
                errorDetails: errorHandler(err),
              });
            } else {
              return res.status(200).json({
                responseData: "Signup success",
                user,
              });
            }
          });
        }
      });
    } else {
      return res.status(500).json({
        errorDetails: "Error occurred. Please try again",
      });
  }
};

exports.loginController = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(404).json({
      errorDetails: firstError,
    });
  } else {
    // check if user exist
    User.findOne({
      email,
    }).exec((err, user) => {
      if (err || !user) {
        return res.status(404).json({
          errorDetails: "User doesn't exist.",
        });
      }
      // authenticate
      if (!user.authenticate(password)) {
        return res.status(401).json({
          errorDetails: "Incorrect email or password",
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

      return res.status(200).json({
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

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["RS256"], // req.user._id
});

exports.forgotPasswordController = (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errorDetails: firstError,
    });
  } else {
    User.findOne(
      {
        email,
      },
      (err, user) => {
        if (err || !user) {
          return res.status(404).json({
            errorDetails: "User does not exist",
          });
        }

        const token = jwt.sign(
          {
            _id: user._id,
            email
          },
          process.env.JWT_RESET_PASSWORD,
          {
            expiresIn: "10m",
          }
        );

        let mailDetails = {
          from: "Navprayas <navprayas@do_not_reply.com>",
          to: email,
          subject: `Password Reset Link - Navprayas`,
          html: `
                    <p>Hello ,</p>
                    <p>It happens that we often forget our password. Don't worry, we at <a href="http://navprayas.in">Navprayas</a> are here to assist you..</p>
                    <p>In order to reset your Navprayas account password, we need to verify if it's nobody but you trying to reset your password. Please use the below link to confirm your email address and complete the reset password process.<p>
                    <p>${process.env.CLIENT_URL}/users/password/reset/${token}</p>
                    <br>
                    <p>Thanks and regards<br>Navprayas<br>(A Group of Innovative Thoughts)</p>
                `,
        };

        return user.updateOne(
          {
            resetPasswordLink: token,
          },
          (err, success) => {
            if (err) {
              console.log("RESET PASSWORD LINK ERROR", err);
              return res.status(500).json({
                errorDetails:
                  "Database connection error on user password forgot request",
              });
            } else {
              // send email from here
              mailTransporter.sendMail(mailDetails, function (err, data) {
                if (err) {
                  return res.status(451).json({
                    errorDetails: errorHandler(err),
                  });
                } else {
                  return res.status(250).json({
                    responseData: `Email has been sent to ${email}.`,
                  });
                }
              });
            }
          }
        );
      }
    );
  }
};

exports.resetPasswordController = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errorDetails: firstError,
    });
  } else {
    if (resetPasswordLink) {
      jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function (
        err,
        decoded
      ) {
        if (err) {
          return res.status(410).json({
            errorDetails: "Expired link. Try again",
          });
        }

        User.findOne(
          {
            resetPasswordLink,
          },
          (err, user) => {
            if (err || !user) {
              return res.status(500).json({
                errorDetails: "Something went wrong. Try later",
              });
            }

            const updatedFields = {
              password: newPassword,
              resetPasswordLink: "",
            };

            user = _.extend(user, updatedFields);

            user.save((err, result) => {
              if (err) {
                return res.status(400).json({
                  errorDetails: "Error resetting user password",
                });
              }
              res.status(200).json({
                responseData: `Great! Now you can login with your new password`,
              });
            });
          }
        );
      });
    }
  }
};
