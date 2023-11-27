const express = require("express");
// internal imports
const {
  touchScreen,
} = require("../controller/touchScreen/touchScreenController");

const router = express.Router();

router.post("/", touchScreen);

module.exports = router;
