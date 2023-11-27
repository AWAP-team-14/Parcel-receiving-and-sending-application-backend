const { check, validationResult } = require("express-validator");
const parcelCreationValidator = [
  check("parcelSize.width").notEmpty().trim().withMessage("required"),
  check("parcelSize.height").notEmpty().trim().withMessage("required"),
  check("parcelSize.depth").notEmpty().trim().withMessage("required"),
  check("parcelSize.weight").notEmpty().trim().withMessage("required"),
  check("sender.name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("sender.address")
    .notEmpty()
    .isIn(["Oulu", "Helsinki", "Tampere", "Turku", "Kuopio"]),
  check("sender.mobile")
    .isMobilePhone("fi-FI", {
      strictMode: true,
    })
    .withMessage("Mobile number must be a valid Finnish mobile number"),
  check("recipient.name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("recipient.address")
    .notEmpty()
    .isIn(["Oulu", "Helsinki", "Tampere", "Turku", "Kuopio"]),
  check("recipient.mobile")
    .isMobilePhone("fi-FI", {
      strictMode: true,
    })
    .withMessage("Mobile number must be a valid Finnish mobile number"),
];

const parcelValidationHandler = (req, res, next) => {
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
  parcelCreationValidator,
  parcelValidationHandler,
};
