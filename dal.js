const User = require("./models/userModel");

exports.addUserDB = async (req, res) => {
  return User.create(req.body);
};
