//Validation helper
const { checkSchema } = require("express-validator");

// Contact Page Validation Here
 exports.validContact = checkSchema({
    name: {
        notEmpty: {
            errorMessage: 'Name is required.'
        },
        isString: {
            errorMessage: 'Name must be a string.'
        }
    },
    email: {
        notEmpty: {
            errorMessage: 'Email is required for further conversation.'
        },
        isEmail: {
            errorMessage: 'Must be a valid email address.'
        }
     },
     contact: {
        optional:true,
        isMobilePhone: {
            errorMessage: 'Mobile number is not valid.'
        },
        custom: {
            options: value => {
                if (value.length != 10) {
                    return Promise.reject('Mobile number is invalid')
                }
                return Promise.resolve()
            }
        }
    },
    subject: {
        notEmpty: {
            errorMessage: 'Subject is required.'
        },
        custom: {
            options: value => {
                if (value.length < 6) {
                    return Promise.reject('Subject is too short.')
                } else if (value.length > 60) {
                    return Promise.reject('Subject is too long. Please use body to explain the subject.')
                }
                return Promise.resolve()
            }
        }
    },
    body: {
        notEmpty: {
            errorMessage: 'Body is required.'
        },
        custom: {
            options: value => {
                if (value.length < 5) {
                    return Promise.reject('Body is too short.')
                } else if (value.length > 250) {
                    return Promise.reject('Body is too long. Please email us at our email address.')
                }
                return Promise.resolve()
            }
        }
    }
})