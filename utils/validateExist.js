import User from "@models/User";

export default async function validateExist(email, username) {
  const isUsernameEmailExist = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });
  return isUsernameEmailExist;
}
