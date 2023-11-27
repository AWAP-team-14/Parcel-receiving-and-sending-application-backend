// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// internal imports
const signUpRouter = require("./router/signUpRouter");
const loginRouter = require("./router/loginRouter");
const deleteRouter = require("./router/deleteRouter");
const driverLoginRouter = require("./router/driverLoginRouter");
const createParcelRouter = require("./router/createParcelRouter");
const touchScreenRouter = require("./router/touchScreenRouter");
const parcelHistoryRouter = require("./router/parcelHistoryRouter");
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

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // change this to the domain you want to allow access to))
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routes
app.use("/signup", signUpRouter);
app.use("/login", loginRouter);
app.use("/driverlogin", driverLoginRouter);
app.use("/delete", deleteRouter);
app.use("/createparcel", createParcelRouter);
app.use("/touchscreen", touchScreenRouter);
app.use("/parcelhistory", parcelHistoryRouter);

// 404 handler
app.use(notFoundHandler);

// error handler
app.use(errorHandler);

// Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
