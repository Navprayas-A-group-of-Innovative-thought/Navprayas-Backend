const express = require("express");
const router = express.Router();

//Load Controllers
const {
  signupController,
  loginController,
  activationController,
} = require("../controllers/auth.controller");

//Validation
const {
  validSignup,
  validLogin,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../helpers/valid");

router.post("/signup", validSignup, signupController);
router.post("/login", validLogin, loginController);
router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ status: "Logged Out" });
});
router.post("/activation", activationController);
// router.post("/signup", validSignup, signupController);

module.exports = router;
