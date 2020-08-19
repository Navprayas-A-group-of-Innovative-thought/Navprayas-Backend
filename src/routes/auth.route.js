const express = require("express");
const router = express.Router();

//Load Controllers
const {
  signupController,
  loginController,
  activationController,
  forgotPasswordController,
  resetPasswordController,
} = require("../controllers/auth.controller");

//Validation
const {
  validSignup,
  validLogin,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../validation/valid");

router.post("/signup", validSignup, signupController);
router.post("/login", validLogin, loginController);
router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ status: "Logged Out" });
});
router.post("/activation", activationController);
router.put('/forgotpassword', forgotPasswordValidator, forgotPasswordController);
router.put('/resetpassword', resetPasswordValidator, resetPasswordController);

module.exports = router;
