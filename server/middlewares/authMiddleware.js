const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  // Taking the token provided from the request header
  const givenToken = req.headers.authorization;

  // If no token has been provided, send the response accordingly
  if (!givenToken) {
    return res.status(401).json({
      message: "No token has been provided",
    });
  }

  // Otherwise, get the token from the given header (Remove the "Bearer")
  const splitValue = givenToken.split(" ");

  if (splitValue.length != 2 || splitValue[0] != "Bearer") {
    return res
      .status(403)
      .json({ message: "Forbiddened again: Invalid token" });
  }

  const token = splitValue[1];
  console.log(token);

  // Verify it
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
    requestingUser = decoded;
    // console.log("Req.user - " + JSON.stringify(req.user));
    next();
  });
};

module.exports = authMiddleware;
