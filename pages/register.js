import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import Layout from "@components/Layout";
import withAuth from "@utils/withAuth";
import Boy1 from "@public/assets/images/boy1.png";
import Boy2 from "@public/assets/images/boy2.png";
import Boy3 from "@public/assets/images/boy3.png";
import Boy4 from "@public/assets/images/boy4.png";
import Girl1 from "@public/assets/images/girl1.png";
import Girl2 from "@public/assets/images/girl2.png";
import Girl3 from "@public/assets/images/girl3.png";
import Girl4 from "@public/assets/images/girl4.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [success, setSuccess] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedImg, setSelectedImg] = useState(1);

  const IMAGES = [
    "boy1.png",
    "boy2.png",
    "boy3.png",
    "boy4.png",
    "girl1.png",
    "girl2.png",
    "girl3.png",
    "girl4.png",
  ];

  const setImage = (n) => {
    setSelectedImg(n);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setSuccess(0);
      setError(0);
      const { data } = await axios.post("/api/register", {
        email,
        username,
        password,
        repassword,
        image: IMAGES[selectedImg - 1],
      });
      if (data.error) {
        setErrorMsg(data.error);
        setError(1);
        return;
      }
      setSuccessMsg(data.status);
      setSuccess(1);
    } catch (err) {
      setErrorMsg("Error Happen");
      setError(1);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRepassword = (e) => {
    setRepassword(e.target.value);
  };

  return (
    <Layout>
      <Head>
        <title>Sign Up | Murochart</title>
      </Head>
      <div className="flex h-screen max-h-screen overflow-hidden">
        <div className="p-8 sm:p-16 w-100">
          <div className="mb-6">
            <Link href="/login">
              <a className="sm:whitespace-nowrap sm:text-lg text-indigo-600 flex gap-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 17l-5-5m0 0l5-5m-5 5h12"
                  />
                </svg>
                <span className="inline-block pt-0.5">Back to login</span>
              </a>
            </Link>
          </div>
          <p className="text-xl sm:text-3xl font-bold">Sign up to Murochart</p>
          <p className="sm:whitespace-nowrap sm:text-lg pt-2">
            Please enter valid information to proceed registration&nbsp;
          </p>

          <form onSubmit={handleRegister} className="py-8 space-y-6">
            {error ? (
              <div className="py-1 px-4 rounded-md bg-red-500 text-white">
                {errorMsg}
              </div>
            ) : (
              ""
            )}
            {success ? (
              <div className="py-1 px-4 rounded-md bg-indigo-700 text-white">
                {successMsg}
              </div>
            ) : (
              ""
            )}
            <div className="grid grid-cols-4 gap-4 w-max">
              <div
                className={`${
                  selectedImg === 1 ? "ring ring-indigo-700" : ""
                } h-12 w-12 rounded-full bg-indigo-300`}
              >
                <Image
                  onClick={() => setImage(1)}
                  src={Boy1}
                  className="cursor-pointer"
                />
              </div>
              <div
                className={`${
                  selectedImg === 2 ? "ring ring-indigo-700" : ""
                } h-12 w-12 rounded-full bg-indigo-300`}
              >
                <Image
                  onClick={() => setImage(2)}
                  src={Boy2}
                  className="cursor-pointer"
                />
              </div>
              <div
                className={`${
                  selectedImg === 3 ? "ring ring-indigo-700" : ""
                } h-12 w-12 rounded-full bg-indigo-300`}
              >
                <Image
                  onClick={() => setImage(3)}
                  src={Boy3}
                  className="cursor-pointer"
                />
              </div>
              <div
                className={`${
                  selectedImg === 4 ? "ring ring-indigo-700" : ""
                } h-12 w-12 rounded-full bg-indigo-300`}
              >
                <Image
                  onClick={() => setImage(4)}
                  src={Boy4}
                  className="cursor-pointer"
                />
              </div>
              <div
                className={`${
                  selectedImg === 5 ? "ring ring-indigo-700" : ""
                } h-12 w-12 rounded-full bg-indigo-300`}
              >
                <Image
                  onClick={() => setImage(5)}
                  src={Girl1}
                  className="cursor-pointer"
                />
              </div>
              <div
                className={`${
                  selectedImg === 6 ? "ring ring-indigo-700" : ""
                } h-12 w-12 rounded-full bg-indigo-300`}
              >
                <Image
                  onClick={() => setImage(6)}
                  src={Girl2}
                  className="cursor-pointer"
                />
              </div>
              <div
                className={`${
                  selectedImg === 7 ? "ring ring-indigo-700" : ""
                } h-12 w-12 rounded-full bg-indigo-300`}
              >
                <Image
                  onClick={() => setImage(7)}
                  src={Girl3}
                  className="cursor-pointer"
                />
              </div>
              <div
                className={`${
                  selectedImg === 8 ? "ring ring-indigo-700" : ""
                } h-12 w-12 rounded-full bg-indigo-300`}
              >
                <Image
                  onClick={() => setImage(8)}
                  src={Girl4}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="text"
                value={email}
                onChange={handleEmail}
                id="email"
                className="font-medium py-1 px-4 rounded-md border-2 bg-gray-50 focus:border-indigo-600 outline-none"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <br />
              <input
                type="text"
                value={username}
                onChange={handleUsername}
                id="username"
                className="font-medium py-1 px-4 rounded-md border-2 bg-gray-50 focus:border-indigo-600 outline-none"
                placeholder="Your Username"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                value={password}
                onChange={handlePassword}
                id="password"
                className="font-medium py-1 px-4 rounded-md border-2 bg-gray-50 focus:border-indigo-600 outline-none"
                placeholder="Your Password"
              />
            </div>
            <div>
              <label htmlFor="repassword">Re-type password</label>
              <br />
              <input
                type="password"
                value={repassword}
                onChange={handleRepassword}
                id="repassword"
                className="font-medium py-1 px-4 rounded-md border-2 bg-gray-50 focus:border-indigo-600 outline-none"
                placeholder="Your Password"
              />
            </div>
            <button
              type="submit"
              className="font-medium py-1.5 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-700 focus:ring-2 focus:ring-offset-1 focus:ring-indigo-700 outline-none focus:outline-none text-white"
            >
              Sign Up
            </button>
          </form>
        </div>
        <div
          className="w-full h-screen bg-cover hidden sm:block"
          style={{ backgroundImage: `url('assets/images/santri.jpeg')` }}
        ></div>
      </div>
    </Layout>
  );
};

export default withAuth(Register, true);
