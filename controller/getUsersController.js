// internal import
const User = require("../models/People");

//get all users
async function findUsers(req, res, next) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  findUsers,
};
