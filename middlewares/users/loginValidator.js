const { check, validationResult } = require("express-validator");

const loginValidator = [
  check("username")
    .isLength({ min: 1 })
    .withMessage("Username is required")
    .trim(),
  check("password")
    .isLength({ min: 1 })
    .withMessage("Password is required")
    .trim(),
];

const loginValidationHandler = function (req, res, next) {
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
  loginValidator,
  loginValidationHandler,
};
