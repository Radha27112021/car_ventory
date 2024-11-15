// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address.",
    ], // Email validation regex
  },
  password: { type: String, required: true },
});

// Use bcryptjs to hash passwords
module.exports = mongoose.model("User", userSchema);
