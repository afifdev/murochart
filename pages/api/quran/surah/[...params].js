import dbConnect from "@utils/dbConnect";
import Quran from "@models/Quran";

dbConnect();

export default async function login(req, res) {
  const { method } = req;
  const { params } = req.query;
  switch (method) {
    case "GET":
      try {
        if (params.length === 1) {
          const surah = await Quran.findOne({ surah_id: parseInt(params[0]) });
          return res.json(surah);
        } else if (params.length === 2) {
          const surah = await Quran.findOne(
            {
              surah_id: parseInt(params[0]),
              verses: { $elemMatch: { verse_id: parseInt(params[1]) } },
            },
            { name: 1, transliteration: 1, verses: 1 }
          );
          if (surah) {
            return res.json(surah);
          }
          return res.json({ error: "No data found" });
        } else {
          return res.json({ error: "Error on calling APIIIIIII" });
        }
      } catch (err) {
        return res.json({ error: "Error on calling API" });
      }
    default:
      return res.json({ error: "Only accept GET method" });
  }
}
