const mongoose = require("mongoose");

const lockerSchema = new mongoose.Schema({
  lockerNumber: {
    type: Number,
    required: true,
  },
  isOccupied: {
    type: Boolean,
    default: false,
  },
});

const parcelLockerSchema = new mongoose.Schema({
  location: {
    type: String,
    enum: ["Oulu", "Helsinki", "Tampere", "Turku", "Kuopio"],
    default: "Oulu",
  },
  lockers: {
    type: [lockerSchema],
  },
});

const ParcelLocker = mongoose.model("ParcelLocker", parcelLockerSchema);

module.exports = ParcelLocker;
