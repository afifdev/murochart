const mongoose = require("mongoose");

const Quran = new mongoose.Schema({
  surah_id: Number,
  name: String,
  transliteration: String,
  translation: String,
  type: String,
  total_verses: Number,
  verses: [
    {
      id: Number,
      text: String,
      translation: String,
    },
  ],
});

module.exports = mongoose.models.Quran || mongoose.model("Quran", Quran);
