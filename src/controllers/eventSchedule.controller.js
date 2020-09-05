// ***************** EVENT SCHEDULE CONTROLLER *************************

// Imports packages here...................................
const eventScheduleModel = require('../model/eventSchedule.model')
require('mongoose');

// exports createController ( to create a eventScheule object ) .........................................
exports.createController = (req, res, next) => {
    eventScheduleModel.create(req.body)                                           // Create a eventScheduleModel and
        .then((eventSchedule) => {                                                // print the same in the console
            console.log('Inserted:\n ', eventSchedule);
            res.statusCode = 200;                                       // IF succes : response with OK
            res.setHeader('Content-Type', 'application/json');
            res.json(eventSchedule);
        }, (err) => next(err))                                          // if failed : throw error
        .catch((err) => next(err));
};

// exports readController ( to read all the eventSchedules present in the database )
exports.readController = (req, res, next) => {
    eventScheduleModel.find({})                                                   //find all the eventSchedule objects to read
        .then((eventSchedulesList) => {
            res.statusCode = 200;                                       // if Success : response with OK
            res.setHeader('Content-Type', 'application/json');
            res.json(eventSchedulesList);
        }, (err) => next(err))                                          // if failed : throw error
        .catch((err) => next(err));
};

// exports updateController ( to update a particular eventSchedule holding the given _id in the request parameter )
exports.updateController = (req, res, next) => {
    eventScheduleModel.findById(req.params.Id)                                 // find a specific eventSchedule object with the given _id
        .then((doc) => {
            if (doc != null) {                                      // check -- is the eventSchedule available?
                if (req.body.date) {                            // if request body contain "date" field
                    doc.date = req.body.date;               // update the "date" 
                }
                if (req.body.eventName) {                              // if request constain "eventName" field
                    doc.eventName = req.body.eventName;                   // update the "eventName"
                }
                doc.save()                                          // save the updated eventSchedule 
                    .then((doc) => {
                        res.statusCode = 200;                       // if succes : response with OK
                        res.setHeader('Content-Type', 'application/json');
                        res.json(doc);
                    }, (err) => next(err));                         // if failed : throw error
            }
            else {                                                  // if eventSchedule with the given _id does not exit
                var err = new Error('eventSchedule ' + req.params.Id + ' not found');     // throw error msg "NOT FOUND"
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err))
};

// exports deleteController ( to delete a particular eventSchedule holding the given _id in the request parameter )
exports.deleteController = (req, res, next) => {
    eventScheduleModel.findByIdAndRemove(req.params.Id, (err, eventSchedule) => {
        // As always, handle any potential errors:
        if (err) return res.status(500).send(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        const response = {
            message: "eventSchedule successfully deleted",
            id: eventSchedule._id
        };
        return res.status(200).send(response);
    })                                    
}