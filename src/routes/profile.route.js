// Import libraries here
const express = require("express");
const router = express.Router();
const authRequired = require('../helpers/auth')

// Load controllers
const { profileController, editController } = require("../controllers/profile.controller");

// All profile related routers here
router.use(authRequired)
router.get("/user/profile", profileController);
router.get('/user/profile/edit', profileController)
router.post('/user/profile/edit',editController)

module.exports = router;
