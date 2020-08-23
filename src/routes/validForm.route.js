const { check } = require('express-validator');

exports.validmtse = [
    check('user.firstName').trim().isAlpha().withMessage('only alphabets is allowed.'),
    check('user.lastName').trim().isAlpha().withMessage('only alphabets is allowed.'),
    check('user.dob').isDate().withMessage('DOB should be in YYYY/MM/DD format'),
    check('user.gender').trim().isIn(['male','female','others']).withMessage('should be male, female, or others'),
    check('user.email').isEmail().withMessage('invalid email').normalizeEmail(),
    check('user.contact.primary').isMobilePhone('en-IN').withMessage('10 digit mobile number'),
    check('user.contact.other').isMobilePhone('en-IN').withMessage('10 digit mobile number'),
    check('user.address.pincode').isPostalCode('IN').withMessage('should be 6 digit no.'),
    check('user.fatherName').trim().matches(/^[a-zA-Z ]*$/).withMessage('name should contain only a-z or A-Z'),
    check('user.motherName').trim().matches(/^[a-zA-Z ]*$/).withMessage('name should contain only a-z or A-Z'),
    check('user.education.class').isInt({min:5,max:10}).withMessage('should be from 5 to 10'),
    check('transactionDate').isDate().withMessage('Date should be in YYYY/MM/DD format'),
    check('registrationDate').isDate().withMessage('Date should be in YYYY/MM/DD format'),
    check('questionPaperLang').isIn(['english','hindi']).withMessage('should be hindi or english'),
    check('year').isInt().withMessage('four digit year eg. 2000')     
]

exports.validPuzzleRace = [
    check('user.firstName').trim().isAlpha().withMessage('only alphabets is allowed.'),
    check('user.lastName').trim().isAlpha().withMessage('only alphabets is allowed.'),
    check('user.dob').isDate().withMessage('DOB should be in YYYY/MM/DD format'),
    check('user.gender').trim().isIn(['male','female','others']).withMessage('should be male, female, or others'),
    check('user.email').isEmail().withMessage('invalid email').normalizeEmail(),
    check('user.contact.primary').isMobilePhone('en-IN').withMessage('10 digit mobile number'),
    check('user.contact.other').isMobilePhone('en-IN').withMessage('10 digit mobile number'),
    check('user.address.pincode').isPostalCode('IN').withMessage('should be 6 digit no.'),
    check('user.fatherName').trim().matches(/^[a-zA-Z ]*$/).withMessage('name should contain only a-z or A-Z'),
    check('user.motherName').trim().matches(/^[a-zA-Z ]*$/).withMessage('name should contain only a-z or A-Z'),
    check('user.education.class').isInt({min:5,max:10}).withMessage('should be from 5 to 10'),
    check('transactionDate').isDate().withMessage('Date should be in YYYY/MM/DD format'),
    check('registrationDate').isDate().withMessage('Date should be in YYYY/MM/DD format'),
    check('category').isIn(['junior','senior']).withMessage('should be junior or senior'),
    check('year').isInt().withMessage('four digit year eg. 2000')
]


exports.validField = [
    check('user.firstName').trim().isAlpha().withMessage('only alphabets is allowed.'),
    check('user.lastName').trim().isAlpha().withMessage('only alphabets is allowed.'),
    check('user.dob').isDate().withMessage('DOB should be in YYYY/MM/DD format'),
    check('user.gender').trim().isIn(['male','female','others']).withMessage('should be male, female, or others'),
    check('user.email').isEmail().withMessage('invalid email').normalizeEmail(),
    check('user.contact.primary').isMobilePhone('en-IN').withMessage('10 digit mobile number'),
    check('user.contact.other').isMobilePhone('en-IN').withMessage('10 digit mobile number'),
    check('user.address.pincode').isPostalCode('IN').withMessage('should be 6 digit no.'),
    check('user.fatherName').trim().matches(/^[a-zA-Z ]*$/).withMessage('name should contain only a-z or A-Z'),
    check('user.motherName').trim().matches(/^[a-zA-Z ]*$/).withMessage('name should contain only a-z or A-Z'),
    check('transactionDate').isDate().withMessage('Date should be in YYYY/MM/DD format'),
    check('registrationDate').isDate().withMessage('Date should be in YYYY/MM/DD format'),
    check('category').isIn(['junior','hsenior']).withMessage('should be junior or senior'),
    check('year').isInt().withMessage('four digit year eg. 2000')
]

exports.validRangotsav = [
    check('user.*.firstName').trim().isAlpha().withMessage('only alphabets is allowed.'),
    check('user.*.lastName').trim().isAlpha().withMessage('only alphabets is allowed.'),
    check('user.*.dob').isDate().withMessage('DOB should be in YYYY/MM/DD format'),
    check('user.*.gender').trim().isIn(['male','female','others']).withMessage('should be male, female, or others'),
    check('user.*.email').isEmail().withMessage('invalid email').normalizeEmail(),
    check('user.*.contact.primary').isMobilePhone('en-IN').withMessage('10 digit mobile number'),
    check('user.*.contact.other').isMobilePhone('en-IN').withMessage('10 digit mobile number'),
    check('user.*.address.pincode').isPostalCode('IN').withMessage('should be 6 digit no.'),
    check('user.*.fatherName').trim().matches(/^[a-zA-Z ]*$/).withMessage('name should contain only a-z or A-Z'),
    check('user.*.motherName').trim().matches(/^[a-zA-Z ]*$/).withMessage('name should contain only a-z or A-Z'),
    check('registrationDate').isDate().withMessage('Date should be in YYYY/MM/DD format'),
    check('category').isIn(['junior','hsenior']).withMessage('should be junior or senior'),
    check('year').isInt().withMessage('four digit year eg. 2000')
]

exports.validCareer = [
    check('firstName').trim().isAlpha().withMessage('only alphabets is allowed.'),
    check('lastName').trim().isAlpha().withMessage('only alphabets is allowed.'),
    check('dob').isDate().withMessage('DOB should be in YYYY/MM/DD format'),
    check('gender').trim().isIn(['male','female','others']).withMessage('should be male, female, or others'),
    check('email').isEmail().withMessage('invalid email').normalizeEmail(),
    check('contact.primary').isMobilePhone('en-IN').withMessage('10 digit mobile number'),
    check('contact.other').isMobilePhone('en-IN').withMessage('10 digit mobile number'),
    check('registrationDate').isDate().withMessage('Date should be in YYYY/MM/DD format'),
    check('year').isInt().withMessage('four digit year eg. 2000')
]