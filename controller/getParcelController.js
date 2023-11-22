const Parcel = require("../models/Parcel");

async function findParcels(req, res, next) {
  try {
    const mobile = req.header("mobile");
    const senderParcels = await Parcel.find({ "sender.mobile": mobile });
    const recipientParcels = await Parcel.find({ "recipient.mobile": mobile });

    if (senderParcels.length > 0) {
      // The mobile number matches either a sender or recipient
      res.status(200).json({
        response: senderParcels,
        success: true,
        isSender: senderParcels.length > 0,
      });
    } else if (recipientParcels.length > 0) {
      // The mobile number matches either a sender or recipient
      res.status(200).json({
        response: recipientParcels,
        success: true,
        isRecipient: recipientParcels.length > 0,
      });
    } else {
      res.status(404).json({
        errors: {
          common: {
            msg: "No parcels found!",
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
  findParcels,
};
