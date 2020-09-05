// ***************** FAQ CONTROLLER *************************

// Imports packages here...................................
const FaqModel = require('../model/faq.model')
require('mongoose');

// exports createController ( to create a faq object ) .........................................
exports.createController = (req, res, next) => {
    FaqModel.create(req.body)                                           // Create a FaqModel and
        .then((faq) => {                                                // print the same in the console
            console.log('Inserted:\n ', faq);
            res.statusCode = 200;                                       // IF succes : response with OK
            res.setHeader('Content-Type', 'application/json');         
            res.json(faq);
        }, (err) => next(err))                                          // if failed : throw error
        .catch((err) => next(err));
};

// exports readController ( to read all the faqs present in the database )
exports.readController = (req, res, next) => {
    FaqModel.find({})                                                   //find all the faq objects to read
        .then((faqsList) => {
            res.statusCode = 200;                                       // if Success : response with OK
            res.setHeader('Content-Type', 'application/json');
            res.json(faqsList);
        }, (err) => next(err))                                          // if failed : throw error
        .catch((err) => next(err));
};

// exports updateController ( to update a particular FAQ holding the given _id in the request parameter )
exports.updateController = (req, res, next) => {
    FaqModel.findById(req.params.Id)                                 // find a specific faq object with the given _id
        .then((doc) => {                                                   
            if (doc != null) {                                      // check -- is the faq available?
                if (req.body.question) {                            // if request body contain "question" field
                    doc.question = req.body.question;               // update the "question" 
                }
                if (req.body.answer) {                              // if request constain "answer" field
                    doc.answer = req.body.answer;                   // update the "answer"
                }
                doc.save()                                          // save the updated faq 
                    .then((doc) => {
                        res.statusCode = 200;                       // if succes : response with OK
                        res.setHeader('Content-Type', 'application/json');
                        res.json(doc);
                    }, (err) => next(err));                         // if failed : throw error
            }
            else {                                                  // if faq with the given _id does not exit
                var err = new Error('faq ' + req.params.Id + ' not found');     // throw error msg "NOT FOUND"
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err))
};

// exports deleteController ( to delete a particular FAQ holding the given _id in the request parameter )
exports.deleteController = (req, res, next) => {
    FaqModel.findByIdAndRemove(req.params.Id, (err, faq) => {
        // As always, handle any potential errors:
        if (err) return res.status(500).send(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        const response = {
            message: "eventSchedule successfully deleted",
            id: faq._id
        };
        return res.status(200).send(response);
    })                                    
};