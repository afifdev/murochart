import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Layout from "@components/Layout";
import { UserContext } from "@utils/useUser";
import withAuth from "@utils/withAuth";

const Login = () => {
  const user = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError(0);
      const { data } = await axios.post("/api/login", { username, password });
      if (data.error) {
        setErrorMsg(data.error);
        setError(1);
        return;
      }
      localStorage.setItem("murochart", data.data.token);
      user.setUsername(username);
      user.setToken(data.data.token);
      user.setIsSigned(1);
    } catch (err) {
      setErrorMsg("Error Happen");
      setError(1);
    }
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (user.isSigned) {
      Router.push("/home");
    }
  }, [user.isSigned]);

  return (
    <Layout>
      <Head>
        <title>Sign In | Murochart</title>
      </Head>
      <div className="flex h-screen max-h-screen overflow-hidden">
        <div className="p-8 sm:p-16 w-100">
          <p className="text-xl sm:text-3xl font-bold">Sign in to Murochart</p>
          <p className="sm:whitespace-nowrap sm:text-lg pt-2">
            Please enter your username and password to proceed
          </p>
          <form onSubmit={handleLogin} className="py-8 space-y-6">
            {error ? (
              <div className="py-1 px-4 rounded-md bg-red-500 text-white">
                {errorMsg}
              </div>
            ) : (
              ""
            )}
            <div>
              <label htmlFor="username">Username</label>
              <br />
              <input
                type="text"
                value={username}
                onChange={handleUsername}
                name="username"
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
                name="password"
                className="font-medium py-1 px-4 rounded-md border-2 bg-gray-50 focus:border-indigo-600 outline-none"
                placeholder="Your Password"
              />
            </div>
            <button
              type="submit"
              className="font-medium py-1.5 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-700 focus:ring-2 focus:ring-offset-1 focus:ring-indigo-700 outline-none focus:outline-none text-white"
            >
              Sign In
            </button>
            <p>
              Not registered yet?{" "}
              <Link href="/register">
                <a className="text-indigo-700">Create an Account</a>
              </Link>
            </p>
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

export default withAuth(Login, true);
