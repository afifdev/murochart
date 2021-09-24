import { hash } from "bcrypt";
import User from "@models/User";
import dbConnect from "@utils/dbConnect";
import validateEmail from "@utils/validateEmail";
import validateForm from "@utils/validateForm";
import validateExist from "@utils/validateExist";

dbConnect();

export default async function register(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const form = req.body;

        if (!validateForm(form)) {
          return res.json({ error: "Please fills out the fields" });
        } else if (!validateEmail(form.email)) {
          return res.json({ error: "Please use valid email address" });
        } else if (form.password !== form.repassword) {
          return res.json({ error: "Password mismatch" });
        } else if (await validateExist(form.email, form.username)) {
          return res.json({ error: "Username or Email already taken" });
        }

        const user = new User({
          email: form.email,
          username: form.username,
          password: await hash(form.password, 12),
          image: form.image,
        });

        const savedUser = await user.save();

        if (!savedUser) {
          return res.json({ error: "Cannot save user" });
        }
        return res.json({ status: "Success" });
      } catch (err) {
        return res.json({ error: "Error happening in register" });
      }
    default:
      return res.json({ error: "Not accepting method except POST" });
  }
}
