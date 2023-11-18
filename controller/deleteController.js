const User = require("../models/People");

async function deleteUser(req, res, next) {
  try {
    const userId = req.header("user");
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "User deleted successfully",
      success: true,
    });
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
  deleteUser,
};
