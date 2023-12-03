// external imports
const express = require("express");

// internal imports
const { createParcelRobot } = require("../controller/robot/parcelGenerator");

const router = express.Router();

router.post("/", (req, res) => {
	createParcelRobot();
	res.json({
		success: true,
		message: "createParcelRobot triggered successfully",
	});
});

module.exports = router;
