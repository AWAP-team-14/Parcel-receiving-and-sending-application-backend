// external imports
const Parcel = require("../models/Parcel");
const People = require("../models/People");
const ParcelLocker = require("../models/ParcelLocker");
async function addParcel(req, res, next) {
  try {
    const sender = await People.findOne({ mobile: req.body.sender.mobile });
    const recipient = await People.findOne({
      mobile: req.body.recipient.mobile,
    });
    if (sender && recipient) {
      let newParcel;
      let randomNumber = (
        Math.floor(Math.random() * (1999 - 1000 + 1)) + 1000
      ).toString();

      let secondRandomNumber = (
        Math.floor(Math.random() * (2999 - 2000 + 1)) + 2000
      ).toString();

      //check if random number already exists in parcel collection
      while (await Parcel.findOne({ senderCode: randomNumber })) {
        // If exists, generate a new random number
        randomNumber = (
          Math.floor(Math.random() * (1999 - 1000 + 1)) + 1000
        ).toString();
      }
      while (await Parcel.findOne({ recipientCode: secondRandomNumber })) {
        // If exists, generate a new random number
        secondRandomNumber = (
          Math.floor(Math.random() * (2999 - 2000 + 1)) + 2000
        ).toString();
      }

      const locker = await ParcelLocker.findOne({
        location: req.body.sender.address,
      });

      const recipientLocker = await ParcelLocker.findOne({
        location: req.body.recipient.address,
      });
      if (locker && recipientLocker) {
        //if locker exists, then check if there is any empty locker
        const emptyLocker = locker.lockers.find((locker) => !locker.isOccupied);
        const recipientEmptyLocker = recipientLocker.lockers.find(
          (recipientLocker) => !recipientLocker.isOccupied
        );

        if (emptyLocker && recipientEmptyLocker) {
          //if empty locker exists, then add parcel to that locker
          newParcel = new Parcel({
            ...req.body,
            senderCode: randomNumber,
            recipientCode: secondRandomNumber,
            senderCabinet: emptyLocker.lockerNumber,
            recipientCabinet: recipientEmptyLocker.lockerNumber,
          });
          await newParcel.save();
          emptyLocker.isOccupied = true;
          recipientEmptyLocker.isOccupied = true;
          await locker.save();
          await recipientLocker.save();
        }
      }

      res.status(201).json({
        message: "Parcel Created Successfully",
        success: true,
      });
    } else {
      res.status(404).json({
        errors: {
          common: {
            msg: "Sender or Recipient not found!",
          },
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
  addParcel,
};
