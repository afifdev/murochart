const mongoose = require("mongoose");

const Quran = new mongoose.Schema({
  name: String,
  transliteration: String,
  translation: String,
  type: String,
  total_verses: Number,
  verses: [
    {
      text: String,
      translation: String,
    },
  ],
});

module.exports = mongoose.models.Quran || mongoose.model("Quran", Quran);
