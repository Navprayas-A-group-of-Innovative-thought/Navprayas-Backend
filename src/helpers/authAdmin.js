// Imports here
const User = require("../model/users.model");
const _ = require("lodash");
const { errorHandler } = require("../helpers/dbErrorHandling");
const jwt = require("jsonwebtoken");

// Middleware to check if the user is admin or not
exports.authAdmin = (req, res, next) => {
    const token = req.headers.authorization.split(" "); // extracting token from header
    const { _id } = jwt.decode(token[1]); // decoding _id from token
    User.findOne({ _id }).exec((err, user) => {
        // searching for user in db
        if (err || !user) {
            // if user not found
            return res.status(404).json({
                errorDetails: "User doesn't exist.",
            });
        } else {
            // check if user is admin or not
            if(!(user.otherDetails.isAdmin === true))
                return res.status(403).json({
                    errorDetails: 'You are not an admin.'
                })
            else{
                next();
            }
        }
    });
};
