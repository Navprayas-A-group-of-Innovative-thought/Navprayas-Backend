// import packages
const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const fhsFormRouter = express.Router();
const validUser = require('./validForm.route');

//import userForm models
const models = require('../model/userForm.model');

// use application/json body-parser
fhsFormRouter.use(bodyParser.json());

// GET /fhs request
fhsFormRouter.route('/')
.get((req,res,next)=>{
   models.fhsUsers.find({})
   .then((users)=>{
       res.statusCode = 200;
       res.setHeader('Content-Type','application/json');
       res.json(users);
   },(err) => next(err))
   .catch((err) => next(err));
});

// POST /fhs request
fhsFormRouter.route('/')
.post(validUser.validField,(req, res, next) => {
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
       }
       models.fhsUsers.create(req.body)
       .then((users) => {
           console.log('Inserted:\n ',users );
           res.statusCode=200;
           res.setHeader('Content-Type','application/json');
           res.json(users);
       },(err) => next(err))
       .catch((err) => next(err));
});

//export fhsFormRouter
module.exports = fhsFormRouter;