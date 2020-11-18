// import packages
const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const fhsFormRouter = express.Router();
const validUser = require('./validForm.route');
const authRequired = require('../helpers/auth');
const authAdmin = require("../helpers/authAdmin");
const _ = require("lodash");
const { errorHandler } = require("../helpers/dbErrorHandling");
const jwt = require("jsonwebtoken");

//import userForm models
const models = require('../model/userForm.model');
const User = require("../model/users.model");

// use application/json body-parser
fhsFormRouter.use(bodyParser.json());

// authentication required
fhsFormRouter.use(authRequired)

// GET /fhs/allUsers request
fhsFormRouter.route('/allUsers/', authAdmin)
    .get((req, res, next) => {
        models.fhsUsers.find({})
            .then((users) => {
                if (users.length == 0) {
                    console.log('No Free Hand Sketching Users found.');
                    return res.status(404).json({ errorDetails: "No Free Hand Sketching Users found." });
                }
                else {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({ responseData: users });
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

// POST /fhs/register request
fhsFormRouter.route('/register/')
    .post(validUser.validField, (req, res, next) => {
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
                models.fhsUsers
                    .findOne({ "user.email": loggedInUser.email })
                    .exec((err, form) => {
                        if (form) {
                            return res.status(403).json({
                                errorDetails: "Already submitted the Free Hand Sketching form.",
                            });
                        } else {
                            const errors = validationResult(req);
                            if (!errors.isEmpty()) {
                                return res.status(422).json({ errors: errors.array() });
                            } else if(!(loggedInUser.email===req.body.user.email)) {
                                return res.status(422).json({
                                    errorDetails: "Email doesn't match with the logged-in user"
                                  });
                            } else {
                                req.body.formSubmitted = true;
                                req.body.registrationDate = Date.now();
                                req.body.year = new Date().getFullYear();
                                req.body.eventId = "FHS2020";
                                models.fhsUsers
                                    .create(req.body)
                                    .then(
                                        (fhsUser) => {
                                            console.log("Inserted:\n ", fhsUser);
                                            res.statusCode = 200;
                                            res.setHeader("Content-Type", "application/json");
                                            res.json(fhsUser);
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

//export fhsFormRouter
module.exports = fhsFormRouter;