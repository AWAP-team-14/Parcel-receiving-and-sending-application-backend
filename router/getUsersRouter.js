// external imports
const express = require("express");

// internal imports
const { findUsers } = require("../controller/getUsersController");

const router = express.Router();

router.get("/", findUsers);

module.exports = router;
