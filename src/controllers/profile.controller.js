// Imports here
const User = require("../model/users.model");
const _ = require("lodash");
const { errorHandler } = require("../helpers/dbErrorHandling");
const jwt = require("jsonwebtoken");

// Profile router here
exports.profileController = (req, res) => {
  const token = req.headers.authorization.split(" "); // extracting token from header
  const { _id } = jwt.decode(token[1]); // decoding _id from token
  User.findOne({ _id }).exec((err, user) => {
    // searching for _id in database
    if (err || !user) {
      // if user not found
      return res.status(404).json({
        errorDetails: "User doesn't exist.",
      });
    } else {
      // if user is found, extracting data from db
      var firstName = user.firstName;
      var lastName = user.lastName;
      var email = user.email;
      var dob = user.dob;
      var gender = user.gender;
      var fatherName = user.profile.fatherName;
      var motherName = user.profile.motherName;
      var grade = user.profile.education.class;
      var year = user.profile.education.year;
      var schoolOrUniv = user.profile.education.schoolorUniv;
      var board = user.profile.education.board;
      var houseNumber = user.profile.address.houseNumber;
      var addressLine1 = user.profile.address.addressLine1;
      var addressLine2 = user.profile.address.addressLine2;
      var landmark = user.profile.address.landmark;
      var district = user.profile.address.district;
      var city = user.profile.address.city;
      var pincode = user.profile.address.pincode;
      var country = user.profile.address.country;
      var facebookLink = user.profile.socialInfo.facebookLink;
      var githubLink = user.profile.socialInfo.githubLink;
      var linkedinLink = user.profile.socialInfo.linkedinLink;
      res.status(200).json({
        // sending data to show in profile page
        firstName: firstName,
        lastName: lastName,
        email: email,
        dob: dob,
        gender: gender,
        fatherName: fatherName,
        motherName: motherName,
        class: grade,
        year: year,
        schoolOrUniv: schoolOrUniv,
        board: board,
        houseNumber: houseNumber,
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        landmark: landmark,
        district: district,
        city: city,
        pincode: pincode,
        country: country,
        facebookLink: facebookLink,
        linkedinLink: linkedinLink,
        githubLink: githubLink,
      });
    }
  });
};

// Edit Profile Router Here
exports.editController = (req, res) => {
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
      // if user is found, get the changes from body
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.profile.fatherName = req.body.fatherName;
      user.profile.motherName = req.body.motherName;
      user.profile.education.grade = req.body.class;
      user.profile.education.year = req.body.year;
      user.profile.education.schoolOrUniv = req.body.schoolOrUniv;
      user.profile.education.board = req.body.board;
      user.profile.address.houseNumber = req.body.houseNumber;
      user.profile.address.addressLine1 = req.body.addressLine1;
      user.profile.address.addressLine2 = req.body.addressLine2;
      user.profile.address.landmark = req.body.landmark;
      user.profile.address.district = req.body.district;
      user.profile.address.city = req.body.city;
      user.profile.address.pincode = req.body.pincode;
      user.profile.address.country = req.body.country;
      user.profile.socialInfo.facebookLink = req.body.facebookLink;
      user.profile.socialInfo.githubLink = req.body.githubLink;
      user.profile.socialInfo.linkedinLink = req.body.linkedinLink;
      user.save((err, user) => {
        // saving in database
        if (err) {
          // if error
          console.log("Save error", errorHandler(err));
          return res.status(500).json({
            errorDetails: errorHandler(err),
          });
        } else {
          // else success
          return res.status(200).json({
            responseData: "Profile updated successfully.",
            user,
          });
        }
      });
    }
  });
};
