// Import libraries here
const express = require("express");
const router = express.Router();
const authRequired = require("../helpers/auth");

// Load controllers
const {
  profileController,
  editController,
  passwordController,
} = require("../controllers/profile.controller");

// Validators here
const {changePasswordValidator} = require("../validation/valid")

// All profile related routers here
router.use(authRequired);
router.get("/profile", profileController);
router.get("/profile/edit", profileController);
router.post("/profile/edit", editController);
router.post("/password/change",changePasswordValidator, passwordController);

module.exports = router;
