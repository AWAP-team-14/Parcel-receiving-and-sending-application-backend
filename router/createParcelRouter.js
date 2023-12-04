// external imports
const express = require("express");

// internal imports
const verifyToken = require("../middlewares/users/verifyToken");
const {
  parcelCreationValidator,
  parcelValidationHandler,
} = require("../middlewares/parcel/createParcelMiddleware");
const { addParcel } = require("../controller/createParcelController");
const { findParcels } = require("../controller/getParcelController");
const { updateParcelStatus } = require("../controller/updateParcelController");
const { sendEmail } = require("../controller/sendEmailController");

const router = express.Router();

router.post(
  "/",
  verifyToken,
  parcelCreationValidator,
  parcelValidationHandler,
  addParcel
);

router.get("/", verifyToken, findParcels);
router.put("/updateparcelstatus/:id", updateParcelStatus);
router.put("/sendemail/:id", sendEmail);
module.exports = router;
