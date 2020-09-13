// Import libraries here
const express = require("express");
const router = express.Router();
const auth = require('../helpers/auth')

// Load Controllers
const { paytmController, callbackController } = require("../controllers/paytm.controller");

// Routes here
router.get("/payment", auth, paytmController);
router.post("/callback", callbackController)

module.exports = router;