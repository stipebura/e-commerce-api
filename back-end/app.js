// env file
require("dotenv").config();
// for try/catch
require("express-async-errors");
//app
const express = require("express");
const app = express();
// port
const port = process.env.PORT || 5000;
// DB
const DB = require("./db/connect");
// errorHandler/notFound middleware
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
// router for authentication
const authRouter = require("./routes/authRoutes");
// some packages
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
// middlewares
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use("/api/v1/auth", authRouter);
app.get("/api/v1", (req, res) => {
  res.send("e-commerce");
});
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
// connect to db and start listening
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
