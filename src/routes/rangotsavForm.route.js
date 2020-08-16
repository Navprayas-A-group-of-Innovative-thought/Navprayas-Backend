// import packages
const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const rangotsavFormRouter = express.Router();

//import userForm models
const models = require('../model/userForm.model');

// use application/json body-parser
rangotsavFormRouter.use(bodyParser.json());

// GET /rangotsav request
rangotsavFormRouter.route('/')
.get((req,res,next)=>{
   models.rangotsavUsers.find({})
   .then((users)=>{
       res.statusCode = 200;
       res.setHeader('Content-Type','application/json');
       res.json(users);
   },(err) => next(err))
   .catch((err) => next(err));
});

// POST /rangotsav request
rangotsavFormRouter.route('/')
.post([ body('user.*.firstName').trim().isAlpha().withMessage('only alphabets is allowed.'),
       body('user.*.lastName').trim().isAlpha().withMessage('only alphabets is allowed.'),
       body('user.*.dob').isDate().withMessage('DOB should be in YYYY/MM/DD format'),
       body('user.*.gender').trim().isIn(['male','female','others']).withMessage('should be male, female, or others'),
       body('user.*.email').isEmail().withMessage('invalid email').normalizeEmail(),
       body('user.*.contact.primary').isMobilePhone('en-IN').withMessage('10 digit mobile number'),
       body('user.*.contact.other').isMobilePhone('en-IN').withMessage('10 digit mobile number'),
       body('user.*.address.pincode').isPostalCode('IN').withMessage('should be 6 digit no.'),
       body('user.*.fatherName').trim().matches(/^[a-zA-Z ]*$/).withMessage('name should contain only a-z or A-Z'),
       body('user.*.motherName').trim().matches(/^[a-zA-Z ]*$/).withMessage('name should contain only a-z or A-Z'),
       body('registrationDate').isDate().withMessage('Date should be in YYYY/MM/DD format'),
       body('category').isIn(['junior','hsenior']).withMessage('should be junior or senior'),
       body('year').isInt().withMessage('four digit year eg. 2000')
   ],(req, res, next) => {
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
       }
       models.rangotsavUsers.create(req.body)
       .then((users) => {
           console.log('Inserted:\n ',users );
           res.statusCode=200;
           res.setHeader('Content-Type','application/json');
           res.json(users);
       },(err) => next(err))
       .catch((err) => next(err));
});

//export rangotsavFormRouter
module.exports = rangotsavFormRouter;