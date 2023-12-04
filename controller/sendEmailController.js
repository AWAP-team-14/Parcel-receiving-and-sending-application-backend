const Parcel = require("../models/Parcel");
const People = require("../models/People");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "team14awap@gmail.com",
    pass: "rtjszvrivneugpbv",
  },
});

async function sendEmail(req, res, next) {
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

    const updatedParcel = await Parcel.findByIdAndUpdate(
      parcelId,

      {
        $set: {
          status: status,
          readyForPickupDateTime: Date.now(),
        },
      },

      { new: true }
    );

    if (updatedParcel) {
      const user = await People.findOne({
        mobile: updatedParcel.recipient.mobile,
      });
      // Send email
      const mailOptions = {
        from: "team14awap@gmail.com",
        to: `${user.email}`,
        subject: "Parcel Pickup Notification",
        text: `Dear ${user.name}, Your parcel is ready for pickup. Please visit the ${updatedParcel.recipient.address} parcel locker to pickup your parcel. Your location is ${updatedParcel.recipient.address}, pickup code is ${updatedParcel.recipientCode} and mobile number is ${updatedParcel.recipient.mobile}.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
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
  sendEmail,
};
