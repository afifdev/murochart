import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import dbConnect from "@utils/dbConnect";
import User from "@models/User";
import Quran from "@models/Quran";

dbConnect();

export default async function progress(req, res) {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        if (
          !req.body.surah_id ||
          !req.body.verse_id ||
          req.body.surah_id === "" ||
          req.body.verse_id === ""
        ) {
          return res.json({ error: "No data sent" });
        }
        const form = req.body;
        if (!req.headers.authorization) {
          return res.json({ error: "Please provide headers" });
        }
        const token = req.headers.authorization.split("Bearer ")[1];
        if (!token) {
          return res.json({ error: "Token not found" });
        }
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if (!user) {
          return res.json({ error: "Token not valid" });
        }
        const user_data = await User.findOne({ username: user.username });
        if (!user_data) {
          return res.json({ error: "User not found" });
        }
        const isMatch = await compare(user.password, user_data.password);
        if (!isMatch) {
          return res.json({ error: "Token not valid" });
        }
        const surahDetail = await Quran.findOne(
          {
            surah_id: parseInt(form.surah_id),
            verses: { $elemMatch: { verse_id: parseInt(form.verse_id) } },
          },
          { name: 1, transliteration: 1, total_verses: 1, verses: 1 }
        );

        if (!surahDetail) {
          return res.json({ error: "No data found" });
        }
        const setProgress = await User.findOneAndUpdate(
          { username: user.username, "progress.surah_id": form.surah_id },
          {
            $set: {
              "progress.$.verse_id": form.verse_id,
            },
          }
        );
        if (setProgress) {
          return res.json({ status: "success" });
        }
        const pushProgress = await User.findOneAndUpdate(
          {
            username: user.username,
          },
          {
            $push: {
              progress: {
                transliteration: surahDetail.transliteration,
                total_verses: surahDetail.total_verses,
                surah_id: form.surah_id,
                verse_id: form.verse_id,
              },
            },
          }
        );
        if (pushProgress) {
          return res.json({ status: "success" });
        }
        return res.json({ error: "Cannot updating user" });
      } catch (err) {
        return res.json({ error: "Error on calling API" });
      }
    default:
      return res.json({ error: "Only accept POST method" });
  }
}
