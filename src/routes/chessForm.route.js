// import packages
const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const chessFormRouter = express.Router();
const validUser = require('./validForm.route');
const authRequired = require('../helpers/auth');
const authAdmin = require("../helpers/authAdmin");
const _ = require("lodash");
const { errorHandler } = require("../helpers/dbErrorHandling");

//import userForm models
const models = require('../model/userForm.model');

// use application/json body-parser
chessFormRouter.use(bodyParser.json());

// authentication required
chessFormRouter.use(authRequired)

// GET /chess/allUsers request
chessFormRouter.route('/allUsers', authAdmin)
    .get((req, res, next) => {
        models.chessUsers.find({})
            .then((users) => {
                if (users.length == 0) {
                    console.log('No Chess Users found.');
                    return res.status(404).json({ errorDetails: "No chess Users found." });
                }
                else {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({ responseData: users });
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

// POST /chess/register request
chessFormRouter.route('/register/')
    .post(validUser.validField, (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(422).json({ errors: errors.array() });
        }
        else {
            req.body.formSubmitted = true;
            models.chessUsers.create(req.body)
                .then((users) => {
                    console.log('Inserted:\n ', users);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(users);
                }, (err) => next(err))
                .catch((err) => next(err));
        }
    });

//export chessFormRouter
module.exports = chessFormRouter;