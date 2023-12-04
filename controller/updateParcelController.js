const Parcel = require("../models/Parcel");
const ParcelLocker = require("../models/ParcelLocker");

async function updateParcelStatus(req, res, next) {
  try {
    const parcelId = req.params.id; // Assuming you pass parcelId as a route parameter
    const { status } = req.body;

    if (!parcelId || !status) {
      return res.status(400).json({
        errors: {
          common: {
            msg: "Invalid request. Parcel ID and status are required.",
          },
        },
        success: false,
      });
    }

    const updatedParcel = await Parcel.findById(parcelId);

    if (updatedParcel) {
      const locker = await ParcelLocker.findOne({
        location: updatedParcel.sender.address,
      });

      const senderCabinet = locker.lockers.find(
        (locker) => locker.lockerNumber === updatedParcel.senderCabinet
      );

      senderCabinet.isOccupied = false;
      await locker.save();
      updatedParcel.status = status;
      updatedParcel.senderCabinet = "";

      await updatedParcel.save();

      res.status(200).json({
        response: updatedParcel,
        success: true,
      });
    } else {
      res.status(404).json({
        errors: {
          common: {
            msg: "Parcel not found!",
          },
        },
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occurred!",
        },
      },
      success: false,
    });
  }
}

module.exports = {
  updateParcelStatus,
};
