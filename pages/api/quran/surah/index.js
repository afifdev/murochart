import dbConnect from "@utils/dbConnect";
import Quran from "@models/Quran";

dbConnect();

export default async function login(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const surahs = await Quran.find(
          {},
          { surah_id: 1, name: 1, transliteration: 1, total_verses: 1 }
        ).sort({ surah_id: 1 });
        return res.json(surahs);
      } catch (err) {
        return res.json({ error: "Error on calling API" });
      }
    default:
      return res.json({ error: "Only accept GET method" });
  }
}
