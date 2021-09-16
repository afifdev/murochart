const mongoose = require("mongoose");

const User = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  progress: {
    surah: Int,
    verse: Int,
  },
});

module.exports = mongoose.models.User || mongoose.model("User", User);
