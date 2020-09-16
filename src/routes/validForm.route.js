const { check } = require('express-validator');

exports.validmtse = [
    check('user.firstName').trim().notEmpty().withMessage('can\'t be left blank').isAlpha().withMessage('only alphabets is allowed.'),
    check('user.lastName').trim().notEmpty().withMessage('can\'t be left blank').isAlpha().withMessage('only alphabets is allowed.'),
    check('user.dob').notEmpty().withMessage('can\'t be left blank').isDate().withMessage('DOB should be in YYYY/MM/DD format'),
    check('user.gender').trim().notEmpty().withMessage('can\'t be left blank').isIn(['male','female','others']).withMessage('should be male, female, or others'),
    check('user.email').notEmpty().withMessage('can\'t be left blank').isEmail().withMessage('invalid email').normalizeEmail(),
    check('user.contact.primary').notEmpty().withMessage('can\'t be left blank').isMobilePhone('en-IN').withMessage('10 digit mobile number'),
    check('user.contact.other').isMobilePhone('en-IN').withMessage('10 digit mobile number'),
    check('user.address.pincode').notEmpty().withMessage('can\'t be left blank').isPostalCode('IN').withMessage('should be 6 digit no.'),
    check('user.fatherName').trim().notEmpty().withMessage('can\'t be left blank').matches(/^[a-zA-Z ]*$/).withMessage('name should contain only a-z or A-Z'),
    check('user.motherName').trim().notEmpty().withMessage('can\'t be left blank').matches(/^[a-zA-Z ]*$/).withMessage('name should contain only a-z or A-Z'),
    check('user.education.class').notEmpty().withMessage('can\'t be left blank').isInt({min:5,max:10}).withMessage('should be from 5 to 10'),
    check('questionPaperLang').isIn(['english','hindi']).withMessage('should be hindi or english')
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
    check('category').isIn(['junior','senior']).withMessage('should be junior or senior')
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
    check('category').isIn(['junior','hsenior']).withMessage('should be junior or senior')
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
    check('category').isIn(['junior','hsenior']).withMessage('should be junior or senior')
]

exports.validCareer = [
    check('firstName').trim().isAlpha().withMessage('only alphabets is allowed.'),
    check('lastName').trim().isAlpha().withMessage('only alphabets is allowed.'),
    check('dob').isDate().withMessage('DOB should be in YYYY/MM/DD format'),
    check('gender').trim().isIn(['male','female','others']).withMessage('should be male, female, or others'),
    check('email').isEmail().withMessage('invalid email').normalizeEmail(),
    check('contact.primary').isMobilePhone('en-IN').withMessage('10 digit mobile number'),
    check('contact.other').isMobilePhone('en-IN').withMessage('10 digit mobile number')
]