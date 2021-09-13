export default function validateForm(form) {
  if (
    !form.email ||
    form.email === "" ||
    form.email !== form.email.toLowerCase() ||
    /\s/g.test(form.email) ||
    !form.username ||
    form.username === "" ||
    form.username !== form.username.toLowerCase() ||
    /\s/g.test(form.username) ||
    !form.password ||
    form.password === "" ||
    !form.repassword
  ) {
    return false;
  }
  return true;
}
