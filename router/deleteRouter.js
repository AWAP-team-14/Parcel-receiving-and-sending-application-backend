// external imports
const express = require("express");

// internal imports
const { deleteUser } = require("../controller/deleteController");
const verifyToken = require("../middlewares/users/verifyToken");

const router = express.Router();

router.delete("/", verifyToken, deleteUser);

module.exports = router;
