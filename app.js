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
const getUsers = require("./router/getUsersRouter");
const robotRouter = require("./router/robotRouter");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: "*", // Set this to the origin you want to allow, or '*' for any origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Include if you are using credentials (e.g., cookies)
    optionsSuccessStatus: 204, // Pre-flight requests should return 204 No Content
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // change this to the domain you want to allow access to))

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
app.use("/getusers", getUsers);
app.use("/robot", robotRouter);

// 404 handler
app.use(notFoundHandler);

// error handler
app.use(errorHandler);

// Server
const port = process.env.PORT || 5000;

let serverInstance = null;

module.exports = {
  start: () => {
    serverInstance = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  },
  close: () => {
    serverInstance.close();
  },
};
