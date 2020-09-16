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

//import userForm models
const models = require('../model/userForm.model');

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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(422).json({ errors: errors.array() });
        }
        else {
            req.body.formSubmitted = true;
            req.body.registrationDate = Date.now();
            req.body.year = new Date().getFullYear();
            models.fhsUsers.create(req.body)
                .then((users) => {
                    console.log('Inserted:\n ', users);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(users);
                }, (err) => next(err))
                .catch((err) => next(err));
        }
    });

//export fhsFormRouter
module.exports = fhsFormRouter;