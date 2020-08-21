const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ");
      const user = jwt.verify(token[1], process.env.JWT_SECRET);
    if (token[0] === "Bearer" && user) {
      next();
    }
  } catch (e) {
    return res.status(401).json('You are not signed in. Please login or signup to continue');
  }
};

module.exports = auth;
