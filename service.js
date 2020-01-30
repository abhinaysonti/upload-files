// const url = require("url");
const User = require("./models/userModel");
exports.createUser = async (req, res) => {
  const newUser = await User.create(req.body);
  console.log(newUser);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(newUser);
};
