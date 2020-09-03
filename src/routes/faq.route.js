// import packages
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const faqRouter = express.Router();
const {
    createController,
    readController,
    updateController,
    deleteController
} = require('../controllers/faq.controller')

//import faq models
const faqModel = require('../model/faq.model');
const { authAdmin } = require('../helpers/authAdmin');
const auth = require('../helpers/auth');

// use application/json body-parser
faqRouter.use(bodyParser.json())

// GET /faq request
faqRouter.get('/', readController);

faqRouter.use(bodyParser.json(), auth, authAdmin)       // middleware to check if the user is logged in and an ADMIN
faqRouter.post('/add', createController)                // POST {{URL}}/faq/add request
faqRouter.put('/:Id/edit', updateController)            // PUT {{URL}}/faq/edit request
faqRouter.delete('/:Id/delete', deleteController);      // DELETE {{URL}}/faq/delete request

//export faqRouter
module.exports = faqRouter;