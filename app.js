// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// internal imports
const signUpRouter = require("./router/signUpRouter");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

const app = express();
dotenv.config();

// Connect to DB

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routes
app.use("/signup", signUpRouter);

// 404 handler
app.use(notFoundHandler);

// error handler
app.use(errorHandler);

// Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
