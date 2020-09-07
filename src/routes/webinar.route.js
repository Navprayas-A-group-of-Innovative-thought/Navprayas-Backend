// Import libraries here
const express = require("express");
const router = express.Router();
const auth = require("../helpers/auth");
const { authAdmin } = require("../helpers/authAdmin");

// Load Controllers
const {
  webinarController,
  addWebinarController,
  editWebinarController,
  deleteWebinarController,
} = require("../controllers/webinar.controller");

// Validation
const { validWebinar } = require("../validation/webinar.valid");

// Routes here
router.get("/", webinarController);
router.use(auth, authAdmin);
router.post("/add", validWebinar, addWebinarController);
router.get("/edit/", editWebinarController);
router.put("/edit/", validWebinar, editWebinarController);
router.delete("/delete/", deleteWebinarController);

module.exports = router;
