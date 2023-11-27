// external imports
const express = require("express");

// internal imports
const verifyToken = require("../middlewares/users/verifyToken");
const { findParcelsHistory } = require("../controller/parcelHistoryController");

const router = express.Router();

router.get("/", verifyToken, findParcelsHistory);

module.exports = router;
