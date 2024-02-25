const { userSignUpSchema } = require("../zod_validations/types");
const { User } = require("../database/db");
const express = require("express");
const router = express.Router();

// Route to Sign Up for the User
router.post("/signup", async (req, res) => {
  // Getting the values passed by the user in the request body, and running it through the Zod validations created for it
  const body = userSignUpSchema.safeParse(req.body);

  // Checking if the body met the zod validations (body.success = true)
  if (body.success) {
    // Introducing a try-catch block because DB connections are going to be done after this point, throw an error if unable to connect to the DB
    try {
      // Look for an existing user with the SAME username
      const existingUser = await User.findOne({
        username: body.data.username,
      });

      if (!existingUser) {
        try {
          // Since there is no existing user with the same username, creating a new user to add into the DB
          const newUser = User({
            firstName: body.data.firstName,
            lastName: body.data.lastName,
            username: body.data.username,
          });
          // Hashing the password, and adding it to newUser once done
          var hashedPassword = await newUser.createHash(body.data.password);
          newUser.password_hash = hashedPassword;

          // Adding the newUser to DB
          await newUser.save();

          return res.status(200).json({
            message: "New user has successfully been created",
          });
        } catch (err) {
          res.status(500).json({
            message: "Error while trying to create the user",
          });
        }
      } else {
        res.status(411).json({
          message: "User with this username already exists",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Some error occurred while connecting to the database",
      });
    }
  } else {
    res.status(422).json({
      message: "Inputs passed within the body did not pass the validations",
    });
  }
});

// Route to Sign in for the User
router.post("/signin", (req, res) => {
  res.status(200).json({
    message: "This is the sign in route",
  });
});

module.exports = router;
