const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const verifyToken = (req, res, next) => {
  const token = req.header("auth_token");

  if (!token) {
    return next(createError(401, "Access denied. Token not provided."));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user information to the request object
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(createError(401, "Access token has expired."));
    } else {
      return next(createError(401, "Invalid token."));
    }
  }
};

module.exports = verifyToken;
