const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "a user must provide a name"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "a user must provide an emailID"],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "a user must provide a password"],
    minlength: 8
  },
  confirmPassword: {
    type: String,
    required: [true, "user should type password again to verify"],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: "passwords do not match"
    }
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
