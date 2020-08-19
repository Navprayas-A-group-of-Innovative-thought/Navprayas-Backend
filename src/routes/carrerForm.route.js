// import packages
const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const careercFormRouter = express.Router();
const validUser = require('./validForm.route');

//import userForm models
const models = require('../model/userForm.model');

// use application/json body-parser
careercFormRouter.use(bodyParser.json());

// GET /career request
careercFormRouter.route('/')
.get((req,res,next)=>{
   models.careerCounUsers.find({})
   .then((users)=>{
       res.statusCode = 200;
       res.setHeader('Content-Type','application/json');
       res.json(users);
   },(err) => next(err))
   .catch((err) => next(err));
});

// POST /career request
careercFormRouter.route('/')
.post(validUser.validCareer,(req, res, next) => {
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
       }
       models.careerCounUsers.create(req.body)
       .then((users) => {
           console.log('Inserted:\n ',users );
           res.statusCode=200;
           res.setHeader('Content-Type','application/json');
           res.json(users);
       },(err) => next(err))
       .catch((err) => next(err));
});

//export careercFormRouter
module.exports = careercFormRouter;