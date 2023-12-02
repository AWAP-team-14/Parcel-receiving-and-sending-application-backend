const express = require("express");
// internal imports
const {
  touchScreen,
} = require("../controller/touchScreen/touchScreenController");
const {
  touchScreenCancel,
} = require("../controller/touchScreen/touchScreenCancelController");

const router = express.Router();

router.post("/", touchScreen);
router.post("/cancel", touchScreenCancel);

module.exports = router;
