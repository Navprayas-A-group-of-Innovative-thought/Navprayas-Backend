// Import libraries here
const express = require("express");
const router = express.Router();

// Load Controllers
const { contactController } = require("../controllers/contact.controller");

//Validation
const { validContact } = require("../validation/contact.valid");

// Routes here
router.post("/contact/submit", validContact, contactController);

module.exports = router;
