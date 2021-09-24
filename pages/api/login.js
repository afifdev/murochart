import jwt from "jsonwebtoken";
import User from "@models/User";
import dbConnect from "@utils/dbConnect";
import { compare } from "bcrypt";

dbConnect();

export default async function login(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const form = req.body;

        if (
          !form.username ||
          form.username === "" ||
          !form.password ||
          form.password === ""
        ) {
          return res.json({ error: "Please fills out the fields" });
        }

        const user = await User.findOne({ username: form.username });

        if (!user) {
          return res.json({ error: "User not found" });
        }

        const isMatch = await compare(form.password, user.password);

        if (!isMatch) {
          return res.json({ error: "Password mismatch" });
        }

        const token = jwt.sign(
          {
            username: form.username,
            password: form.password,
          },
          process.env.JWT_SECRET
        );

        return res.json({
          status: "Success",
          data: {
            image: user.image,
            token,
          },
        });
      } catch (err) {
        return res.json({ error: "Error happening in login" });
      }
    default:
      return res.json({ error: "Not accepting method except POST" });
  }
}
