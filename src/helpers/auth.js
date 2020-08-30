const jwt = require("jsonwebtoken");

// Middleware to check if the user is logged in or not
const auth = (req, res, next) => {
  try {
    // Extracting token from authorization in header and splitting it as Bearer and token id
    const token = req.headers.authorization.split(" ");
    // Verifying the extracted token id with the secret key
    const user = jwt.verify(token[1], process.env.JWT_SECRET);
    if (token[0] === "Bearer" && user) {
      next();
    }
  } catch (e) {
    return res
      .status(401)
      .json({
        errorDetails: "You are not signed in. Please login   to continue",
      });
  }
};

module.exports = auth;
