require("dotenv").config();
const express = require("express");
const mainRouter = require("./routes/mainRouter");
const PORT = process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(
  cors({
    origin: ["https://127.0.0.1:5173", "https://127.0.0.1:5174"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/v1", mainRouter);

app.listen(PORT, (err) => {
  if (err) console.log(`Error while connecting to PORT: ${PORT}\n`, err);
  console.log("Server is listening at PORT:", PORT);
});
