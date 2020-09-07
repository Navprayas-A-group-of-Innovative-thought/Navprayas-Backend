//Validation helper
const { checkSchema } = require("express-validator");

// Webinar Page Validation Here
exports.validWebinar = checkSchema({
    title: {
        notEmpty: {
            errorMessage: 'Title of webinar is required.'
        },
        isString: {
            errorMessage: 'Title must be a string.'
        }
    },
    date: {
        notEmpty: {
            errorMessage: 'Date is required.'
        },
        isDate: {
            errorMessage: 'Date must be a valid date.'
        }
    },
    time: {
        notEmpty: {
            errorMessage: 'Time is required.'
        },
        isString: {
            errorMessage: 'Time must be string.'
        }
    },
    link: {
        notEmpty: {
            errorMessage: 'Webinar link is required.'
        },
        isURL: {
            errorMessage: 'Link must be a valid URL.'
        }
    },
    speakers: {
        notEmpty: {
            errorMessage: 'Speaker is required.'
        },
        isArray: {
            errorMessage: 'Speaker must be within an array.'
        }
    }
})