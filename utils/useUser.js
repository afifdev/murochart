import axios from "axios";
import jwt from "jsonwebtoken";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [token, setToken] = useState("");
  const [isSigned, setIsSigned] = useState(0);
  const [isDone, setIsDone] = useState(0);

  useEffect(async () => {
    const systemToken = localStorage.getItem("murochart");
    if (!systemToken) {
      setIsDone(1);
      return;
    }
    try {
      const user = jwt.decode(systemToken, process.env.JWT_SECRET);
      const { data } = await axios.post("/api/login", user);
      if (data.error) {
        localStorage.removeItem("murochart");
        console.log("initial login error");
      } else {
        setUsername(user.username);
        setToken(data.data.token);
        setImage(data.data.image);
        setIsSigned(1);
        setIsDone(1);
        console.log("initial login success");
      }
    } catch (e) {
      localStorage.removeItem("murochart");
      setIsDone(1);
      console.log("error calling api to start context");
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        image,
        setImage,
        token,
        setToken,
        isSigned,
        setIsSigned,
        isDone,
        setIsDone,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
