// import packages
const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const careercFormRouter = express.Router();

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
.post([ body('firstName').trim().isAlpha().withMessage('only alphabets is allowed.'),
       body('lastName').trim().isAlpha().withMessage('only alphabets is allowed.'),
       body('dob').isDate().withMessage('DOB should be in YYYY/MM/DD format'),
       body('gender').trim().isIn(['male','female','others']).withMessage('should be male, female, or others'),
       body('email').isEmail().withMessage('invalid email').normalizeEmail(),
       body('contact.primary').isMobilePhone('en-IN').withMessage('10 digit mobile number'),
       body('contact.other').isMobilePhone('en-IN').withMessage('10 digit mobile number'),
       body('registrationDate').isDate().withMessage('Date should be in YYYY/MM/DD format'),
       body('year').isInt().withMessage('four digit year eg. 2000')
   ],(req, res, next) => {
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