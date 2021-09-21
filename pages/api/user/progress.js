import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import dbConnect from "@utils/dbConnect";
import User from "@models/User";
import Quran from "@models/Quran";

dbConnect();

export default async function login(req, res) {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        if (
          !req.body.surah ||
          !req.body.verse ||
          req.body.surah === "" ||
          req.body.verse === ""
        ) {
          return res.json({ error: "No data sent" });
        }
        const form = req.body;
        if (!req.headers.authorization) {
          return res.json({ error: "Please provide token" });
        }
        const token = req.headers.authorization.split("Bearer ")[1];
        if (!token) {
          return res.json({ error: "Token not found" });
        }
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if (!user) {
          return res, json({ error: "Token not valid" });
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
            surah_id: parseInt(form.surah),
            verses: { $elemMatch: { verse_id: parseInt(form.verse) } },
          },
          { name: 1, transliteration: 1, total_verse: 1, verses: 1 }
        );

        if (!surahDetail) {
          return res.json({ error: "No data found" });
        }
        const setProgress = await User.findOneAndUpdate(
          { username: user.username, "progress.surah_id": form.surah },
          {
            $set: {
              "progress.$.verse_id": form.verse,
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
                total_verse: surahDetail.total_verse,
                surah_id: form.surah,
                verse_id: form.verse,
              },
            },
          }
        );
        if (pushProgress) {
          return res.json({ status: "success 2" });
        }
        return res.json({ error: "Cannot updating user" });
      } catch (err) {
        return res.json({ error: "Error on calling API" });
      }
    default:
      return res.json({ error: "Only accept POST method" });
  }
}

// try {
//   const progress = await User.aggregate([
//     { $match: { username: "afifudin" } },
//     { $unwind: "$progress" },
//     { $match: { "progress.date": { $gte: new Date("2021-09") } } },
//     { $group: { _id: "$_id", progress: { $push: "$progress" } } },
//   ]);
//   return res.json({ data: progress });
// } catch (e) {
//   console.log(e);
//   return res.json({ error: "ini error" });
// }
