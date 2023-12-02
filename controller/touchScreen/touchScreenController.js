// external imports
const Parcel = require("../../models/Parcel");
const ParcelLocker = require("../../models/ParcelLocker");
async function touchScreen(req, res, next) {
  try {
    const locker = await ParcelLocker.findOne({
      location: req.body.address,
    });
    const senderParcel = await Parcel.findOne({
      $and: [
        { senderCode: req.body.code },
        { "sender.mobile": req.body.mobile },
      ],
    });

    const recipientParcel = await Parcel.findOne({
      $and: [
        { recipientCode: req.body.code },
        { "recipient.mobile": req.body.mobile },
      ],
    });

    if (locker && senderParcel) {
      //if locker & senderParcel exists, then open a cabinet for 2 minutes that sender can put the parcel
      const senderCabinet = locker.lockers.find(
        (locker) => locker.lockerNumber === senderParcel.senderCabinet
      );
      if (senderCabinet) {
        res.status(200).json({
          message: `Cabinet ${senderCabinet.lockerNumber} is open for drop the parcel.`,
          success: true,
        });
      }
    } else if (locker && recipientParcel) {
      //if locker & recipientParcel exists, then open a cabinet for 2 minutes that recipient can pick the parcel
      const recipientCabinet = locker.lockers.find(
        (locker) => locker.lockerNumber === recipientParcel.recipientCabinet
      );
      if (recipientCabinet) {
        res.status(200).json({
          message: `Cabinet ${recipientCabinet.lockerNumber} is open for pick up the parcel.`,
          success: true,
        });
      }
    } else {
      res.status(404).json({
        errors: {
          msg: "Please check your code, Location and mobile number!",
        },
        success: false,
      });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
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
  touchScreen,
};
