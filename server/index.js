require("dotenv").config();
const express = require("express");
const mainRouter = require("./routes/mainRouter");
const PORT = process.env.PORT;

const app = express();

app.use("/api/v1", mainRouter);

app.listen(PORT, (err) => {
  if (err) console.log(`Error while connecting to PORT: ${PORT}\n`, err);
  console.log("Server is listening at PORT:", PORT);
});
