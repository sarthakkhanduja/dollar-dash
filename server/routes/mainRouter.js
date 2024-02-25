const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");

router.use("/user", userRouter);

router.get("/", (req, res) => {
  res.status(200).json({
    message: "This is the Main Router",
  });
});

module.exports = router;
