// external imports
const Parcel = require("../../models/Parcel");
const ParcelLocker = require("../../models/ParcelLocker");
const ParcelHistory = require("../../models/ParcelHistory");
async function touchScreenCancel(req, res, next) {
  const token = req.header("auth_token") || "";

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
      if (senderCabinet && token === "Cancel") {
        //senderCabinet.isOccupied = false;
        //await locker.save();
        senderParcel.status = "Sender Droped the Parcel in Locker";
        senderParcel.senderCode = "";
        //senderParcel.senderCabinet = "";
        await senderParcel.save();
        res.status(200).json({
          success: true,
        });
      }
    } else if (locker && recipientParcel) {
      //if locker & recipientParcel exists, then open a cabinet for 2 minutes that recipient can pick the parcel
      const recipientCabinet = locker.lockers.find(
        (locker) => locker.lockerNumber === recipientParcel.recipientCabinet
      );
      if (recipientCabinet && token === "Cancel") {
        recipientCabinet.isOccupied = false;
        await locker.save();
        recipientParcel.status = "Picked Up by Recipient";
        recipientParcel.recipientCode = "";
        recipientParcel.recipientCabinet = "";
        recipientParcel.pickedUpDateTime = Date.now();
        await recipientParcel.save();
        //create a new parcel history for the picked up parcel and save it to the database
        const parcelHistory = new ParcelHistory({
          sender: {
            name: recipientParcel.sender.name,
            address: recipientParcel.sender.address,
            mobile: recipientParcel.sender.mobile,
          },
          recipient: {
            name: recipientParcel.recipient.name,
            address: recipientParcel.recipient.address,
            mobile: recipientParcel.recipient.mobile,
          },
          readyForPickupDateTime: recipientParcel.readyForPickupDateTime,
          pickedUpDateTime: recipientParcel.pickedUpDateTime,
          status: recipientParcel.status,
        });
        await parcelHistory.save();
        //delete the picked up parcel from the database
        await Parcel.deleteOne({ _id: recipientParcel._id });
        res.status(200).json({
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
  touchScreenCancel,
};
