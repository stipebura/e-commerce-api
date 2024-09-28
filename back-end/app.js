require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const DB = require("./db/connect");
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
