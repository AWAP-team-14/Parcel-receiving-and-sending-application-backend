const { check, validationResult } = require("express-validator");
const User = require("../../models/People");
const signUpValidator = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (email) => {
      try {
        const user = await User.findOne({ email: email });
        if (user) {
          throw new Error("Email already in use");
        }
      } catch (error) {
        throw new Error(error.message);
      }
    }),
  check("mobile")
    .isMobilePhone("fi-FI", {
      strictMode: true,
    })
    .withMessage("Mobile number must be a valid Finnish mobile number")
    .custom(async (mobile) => {
      try {
        const user = await User.findOne({ mobile: mobile });
        if (user) {
          throw new Error("Mobile number already in use");
        }
      } catch (error) {
        throw new Error(error.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    ),
];

const signUpValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  signUpValidator,
  signUpValidationHandler,
};
