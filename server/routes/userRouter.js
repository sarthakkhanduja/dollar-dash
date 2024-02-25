const express = require("express");
const router = express.Router();

// Route to Sign Up for the User
router.post("/signup", (req, res) => {
  res.status(200).json({
    message: "This is the sign up route",
  });
});

// Route to Sign in for the User
router.post("/signin", (req, res) => {
  res.status(200).json({
    message: "This is the sign in route",
  });
});

module.exports = router;
