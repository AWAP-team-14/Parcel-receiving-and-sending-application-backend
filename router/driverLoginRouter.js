// external imports
const express = require("express");

// internal imports
const { login } = require("../controller/driverLoginController");
const {
  loginValidator,
  loginValidationHandler,
} = require("../middlewares/users/loginValidator");

const router = express.Router();

router.post("/", loginValidator, loginValidationHandler, login);

module.exports = router;
