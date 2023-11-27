// external imports
const express = require("express");

// internal imports
const {
  signUpValidator,
  signUpValidationHandler,
} = require("../middlewares/users/signUpValidator");
const { addUser } = require("../controller/signUpController");

const router = express.Router();

router.post("/", signUpValidator, signUpValidationHandler, addUser);

module.exports = router;
