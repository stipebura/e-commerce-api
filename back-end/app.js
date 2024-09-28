require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const DB = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
app.use(express.json());
app.get("/", (req, res) => {
  res.send("e-commerce");
});
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const start = async () => {
  try {
    await DB(process.env.MONGO_URL);
    app.listen(
      port,
      console.log(`Server is connected to db and listening on port ${port}`)
    );
  } catch (error) {}
};
start();
