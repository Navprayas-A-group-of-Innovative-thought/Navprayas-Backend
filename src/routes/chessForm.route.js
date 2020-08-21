// import packages
const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const chessFormRouter = express.Router();
const validUser = require('./validForm.route');
const authRequired = require('../helpers/auth')

//import userForm models
const models = require('../model/userForm.model');

// use application/json body-parser
chessFormRouter.use(bodyParser.json());

// authentication required
chessFormRouter.use(authRequired)

// GET /chess request
chessFormRouter.route('/')
.get((req,res,next)=>{
   models.chessUsers.find({})
   .then((users)=>{
       res.statusCode = 200;
       res.setHeader('Content-Type','application/json');
       res.json(users);
   },(err) => next(err))
   .catch((err) => next(err));
});

// POST /chess request
chessFormRouter.route('/')
.post(validUser.validField,(req, res, next) => {
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
       }
       models.chessUsers.create(req.body)
       .then((users) => {
           console.log('Inserted:\n ',users );
           res.statusCode=200;
           res.setHeader('Content-Type','application/json');
           res.json(users);
       },(err) => next(err))
       .catch((err) => next(err));
});

//export chessFormRouter
module.exports = chessFormRouter;