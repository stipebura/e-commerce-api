require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const DB = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const authRouter = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use("/api/v1/auth", authRouter);
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
