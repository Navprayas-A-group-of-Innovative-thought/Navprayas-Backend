// import packages
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const eventScheduleRouter = express.Router();
const {
    createController,
    readController,
    updateController,
    deleteController
} = require('../controllers/eventSchedule.controller')

//import evenSchedule models
const eventScheduleModel = require('../model/eventSchedule.model');
const { authAdmin } = require('../helpers/authAdmin');
const auth = require('../helpers/auth');

// use application/json body-parser
eventScheduleRouter.use(bodyParser.json())

// GET /eventschedule request
eventScheduleRouter.get('/', readController);

eventScheduleRouter.use(bodyParser.json(), auth, authAdmin)       // middleware to check if the user is logged in and an ADMIN
eventScheduleRouter.post('/add', createController)                // POST {{URL}}/eventschedule/add request
eventScheduleRouter.put('/:Id/edit', updateController)            // PUT {{URL}}/eventschedule/edit request
eventScheduleRouter.delete('/:Id/delete', deleteController);      // DELETE {{URL}}/eventschedule/delete request

//export eventScheduleRouter
module.exports = eventScheduleRouter;