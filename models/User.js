const mongoose = require("mongoose");

const User = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  progress: [
    {
      transliteration: String,
      total_verse: Number,
      surah_id: Number,
      verse_id: Number,
    },
  ],
});

module.exports = mongoose.models.User || mongoose.model("User", User);
