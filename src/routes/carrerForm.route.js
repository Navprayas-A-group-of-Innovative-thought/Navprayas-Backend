// import packages
const express = require("express");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const careercFormRouter = express.Router();
const validUser = require("./validForm.route");
const authRequired = require("../helpers/auth");
const authAdmin = require("../helpers/authAdmin");
const _ = require("lodash");
const { errorHandler } = require("../helpers/dbErrorHandling");
const jwt = require("jsonwebtoken");

//import userForm models
const models = require("../model/userForm.model");
const User = require("../model/users.model");

// use application/json body-parser
careercFormRouter.use(bodyParser.json());

//authentication required
careercFormRouter.use(authRequired)

// GET /career/allUsers request
careercFormRouter.route("/allUsers/", authAdmin)
  .get((req, res, next) => {
    models.careerCounUsers
      .find({})
      .then(
        (users) => {
          if (users.length == 0) {
            console.log('No CareerCounselling Users found.');
            return res.status(404).json({ errorDetails: "No CareerCounselling Users found." });
          }
          else {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ responseData: users });
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

// POST /career/register request
careercFormRouter.route("/register/")
  .post(validUser.validCareer, (req, res, next) => {
    const token = req.headers.authorization.split(" "); // extracting token from header
    const { _id } = jwt.decode(token[1]); // decoding _id from token
    User.findOne({ _id }).exec((err, loggedInUser) => {
      //searching for _id in User database
      if (err || !loggedInUser) {
        // if user not found
        return res.status(404).json({
          errorDetails: "User doesn't exist.",
        });
      }
      else if (loggedInUser) {
        models.careerCounUsers
          .findOne({ "email": loggedInUser.email })
          .exec((err, form) => {
            if (form) {
              return res.status(403).json({
                errorDetails: "Already submited the Career Counselling form.",
              });
            } else {
              const errors = validationResult(req);
              if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
              } else if (!(loggedInUser.email === req.body.email)) {
                return res.status(422).json({
                  errorDetails: "Email doesn't match with the logged-in user"
                });
              } else {
                req.body.formSubmitted = true;
                req.body.registrationDate = Date.now();
                req.body.year = new Date().getFullYear();
                req.body.eventId = "CAREERCOUNSELLING2020";
                models.careerCounUsers
                  .create(req.body)
                  .then(
                    (careerUser) => {
                      console.log("Inserted:\n ", careerUser);
                      res.statusCode = 200;
                      res.setHeader("Content-Type", "application/json");
                      res.json(careerUser);
                    },
                    (err) => next(err)
                  )
                  .catch((err) => next(err));
              }
            }
          });
      }
    })
  });

//export careercFormRouter
module.exports = careercFormRouter;
