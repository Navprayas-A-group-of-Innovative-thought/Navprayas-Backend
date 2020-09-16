// import packages
const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const mtseFormRouter = express.Router();
const validUser = require('./validForm.route');
const authRequired = require('../helpers/auth');
const authAdmin = require("../helpers/authAdmin");
const _ = require("lodash");
const { errorHandler } = require("../helpers/dbErrorHandling");

//import userForm models
const models = require('../model/userForm.model');

// use application/json body-parser
mtseFormRouter.use(bodyParser.json());

// authentication required
mtseFormRouter.use(authRequired)

// GET /mtse/allUsers request
mtseFormRouter.route('/allUsers/', authAdmin)
    .get((req, res, next) => {
        models.mtseUsers.find({})
            .then((users) => {
                if (users.length == 0) {
                    console.log('No MTSE Users found.');
                    return res.status(404).json({ errorDetails: "No MTSE Users found." });
                }
                else {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({ responseData: users });
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

// POST /mtse/register request
mtseFormRouter.route('/register/',)
    .post(validUser.validmtse, (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(422).json({ errors: errors.array() });
        }
        else {
            req.body.formSubmitted = true;
            req.body.registrationDate = Date.now();
            req.body.year = new Date().getFullYear();
            models.mtseUsers.create(req.body)
                .then((users) => {
                    console.log('Inserted:\n ', users);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(users);
                }, (err) => next(err))
                .catch((err) => next(err));
        }
    });

//export mtseFormRouter
module.exports = mtseFormRouter;