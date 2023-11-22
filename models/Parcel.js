const mongoose = require("mongoose");

// Define Parcel schema
const parcelSchema = new mongoose.Schema({
  parcelSize: {
    width: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    depth: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
  },
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
      "Picked Up",
      "Delivered",
      "Cancelled",
      "Parcel Created",
    ],
    default: "Parcel Created",
  },
  senderCode: {
    type: String,
    default: "",
  },
  senderCabinet: {
    type: Number,
    default: "",
  },
  recipientCode: {
    type: String,
    default: "",
  },
  recipientCabinet: {
    type: Number,
    default: "",
  },
});

// Create Parcel model
const Parcel = mongoose.model("Parcel", parcelSchema);

module.exports = Parcel;
