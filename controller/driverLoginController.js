// external import
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
// internal import
const Driver = require("../models/Driver");

// do login

async function login(req, res, next) {
  try {
    // find user with requested email/phonenumber
    const driver = await Driver.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });
    if (driver && driver._id) {
      // compare password
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        driver.password
      );
      if (isValidPassword) {
        // prepare the user object to generate token
        const driverObject = {
          username: driver.name,
          email: driver.email,
          mobile: driver.mobile,
        };
        // generate token
        const token = jwt.sign(driverObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });
        // set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });

        // set logged in user local variable
        res.locals.loggedInUser = driverObject;
        res.status(201).json({
          message: "Login Successful",
          success: true,
        });
      } else {
        throw createError("Login Failed");
      }
    } else {
      throw createError("Login Failed");
    }
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occured!",
        },
      },
      success: false,
    });
  }
}

module.exports = {
  login,
};
