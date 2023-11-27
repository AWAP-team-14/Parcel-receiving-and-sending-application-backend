const mongoose = require("mongoose");

// Define Parcel schema
const parcelSchema = new mongoose.Schema({
  sender: {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      enum: ["Oulu", "Helsinki", "Tampere", "Turku", "Kuopio"],
    },
    mobile: {
      type: String,
      required: true,
    },
  },
  recipient: {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      enum: ["Oulu", "Helsinki", "Tampere", "Turku", "Kuopio"],
    },
    mobile: {
      type: String,
      required: true,
    },
  },
  readyForPickupDateTime: {
    type: Date,
    default: "",
  },
  pickedUpDateTime: {
    type: Date,
    default: "",
  },
  status: {
    type: String,
    enum: [
      "Ready for Pickup",
      "Picked Up by Recipient",
      "Driver Picked Up Parcel",
      "Sender Droped the Parcel in Locker",
      "Parcel Created",
    ],
    default: "Parcel Created",
  },
});

// Create Parcel model
const ParcelHistory = mongoose.model("ParcelHistory", parcelSchema);

module.exports = ParcelHistory;
