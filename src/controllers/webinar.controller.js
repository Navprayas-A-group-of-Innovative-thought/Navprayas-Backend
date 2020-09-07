// Imports here
const Webinar = require("../model/webinar.model");
const _ = require("lodash");
const { errorHandler } = require("../helpers/dbErrorHandling");
const jwt = require("jsonwebtoken");
const { validationResult, body } = require("express-validator");

// Get Webinar Router here
exports.webinarController = (req, res) => {
  if (!req.query.id) {
    Webinar.find({}).then((webinarList) => {
      if (webinarList.length == 0) {
        return res
          .status(404)
          .json({ errorDetails: "No webinar could be fetched." });
      } else {
        res.status(200).json({ reponseData: webinarList });
      }
    });
  } else {
    Webinar.findById(req.query.id).exec((err, webinar) => {
      // Find webinar by query ID
      if (err || !webinar) {
        // If error or not found
        return res.status(404).json({ errorDetails: "No such webinar found." });
      } else {
        // If no error
        var title = webinar.title;
        var date = webinar.date;
        var time = webinar.time;
        var link = webinar.link;
        var speakers = webinar.speakers;
        res.status(200).json({
          title: title,
          date: date,
          time: time,
          link: link,
          speakers: speakers,
        });
      }
    });
  }
};

// Create New Webinar Router here
exports.addWebinarController = (req, res) => {
  const { title, date, time, link, speakers } = req.body; // get details from body
  const errors = validationResult(req); // validating against validators
  if (!errors.isEmpty()) {
    // if error
    // If errors
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errorDetails: firstError,
    });
  } else {
    // if no error
    const webinar = new Webinar({
      title,
      date,
      time,
      link,
      speakers,
    });
    webinar.save((err, webinar) => {
      if (err) {
        // if error while saving into database
        console.log("Save error", errorHandler(err));
        return res.status(500).json({
          errorDetails: errorHandler(err),
        });
      } else {
        // if no error
        return res.status(200).json({
          responseData: "Webinar details added successfully.",
          webinar,
        });
      }
    });
  }
};

// Edit Webinar Router here
exports.editWebinarController = (req, res) => {
  Webinar.findById(req.query.id).exec((err, webinar) => {
    // Find webinar by query ID
    if (err || !webinar) {
      // if error
      return res.status(404).json({ errorDetails: "No such webinar found." });
    } else {
      // if no error
      webinar.title = req.body.title;
      webinar.date = req.body.date;
      webinar.time = req.body.time;
      webinar.link = req.body.link;
      webinar.speakers = req.body.speakers;
      webinar.save((err, webinar) => {
        if (err) {
          // if error
          console.log("Save error", errorHandler(err));
          return res.status(500).json({
            errorDetails: errorHandler(err),
          });
        } else {
          // else success
          return res.status(200).json({
            responseData: "Webinar details updated successfully.",
            webinar,
          });
        }
      });
    }
  });
};

// Delete Webinar Router here
exports.deleteWebinarController = (req, res) => {
  Webinar.findByIdAndRemove(req.query.id).exec((err, webinar) => {
    // find webinar by id
    if (err || !webinar) {
      // if error or not found
      return res.status(404).json({ errorDetails: "No such webinar found." });
    } else {
      res.status(200).json({
        // else success
        responseData: `Webinar with ID ${req.query.id} deleted successfully.`,
      });
    }
  });
};
