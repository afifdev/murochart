import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import dbConnect from "@utils/dbConnect";
import User from "@models/User";

dbConnect();

export default async function user(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
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
        const user_data = await User.aggregate([
          {
            $match: {
              username: user.username,
            },
          },
          { $unwind: "$progress" },
          {
            $sort: {
              "progress.surah_id": 1,
            },
          },
          {
            $group: {
              _id: "$_id",
              username: { $first: "$username" },
              password: { $first: "$password" },
              progress: { $push: "$progress" },
            },
          },
        ]);
        if (!user_data[0]) {
          return res.json({ error: "User not found" });
        }
        const isMatch = await compare(user.password, user_data[0].password);
        if (!isMatch) {
          return res.json({ error: "Token not valid" });
        }
        delete user_data[0].password;
        return res.json(user_data[0]);
      } catch (err) {
        return res.json({ error: "Error on calling API" });
      }
    default:
      return res.json({ error: "Only accepting GET method" });
  }
}
