import Image from "next/image";
import Router from "next/router";
import { UserContext } from "@utils/useUser";
import { useContext, useEffect, useState } from "react";

export default function Navbar() {
  const user = useContext(UserContext);
  const [show, setShow] = useState(0);

  const showSetting = () => {
    setShow(!show);
  };

  const logOut = () => {
    localStorage.removeItem("murochart");
    user.setUsername("");
    user.setImage("");
    user.setToken("");
    user.setIsSigned(0);
  };

  useEffect(() => {
    if (!user.isSigned) {
      Router.push("/login");
    }
  }, [user.isSigned]);
  return (
    <div className="flex justify-between items-center gap-8 py-4 sm:py-6 px-6 shadow">
      <div className="flex items-center gap-4">
        <div className="block sm:flex items-center gap-8">
          <p className="text-xl sm:text-2xl">Hello {user.username} 👋</p>
          <p className="text-xs phone:text-base text-gray-700">
            Progress is progress{" "}
            <span className="text-indigo-700">No Matter</span> how{" "}
            <span className="text-indigo-700">Small</span>
          </p>
        </div>
      </div>
      <div>
        <div className="w-8 h-8 rounded-full bg-indigo-300 relative">
          <Image
            src={`/assets/images/${user.image}`}
            width={32}
            height={32}
            onClick={showSetting}
            className="cursor-pointer"
          />
          <div
            className={`${
              show ? "block" : "hidden"
            } absolute shadow right-0 border bg-white rounded-lg py-2 w-max`}
          >
            <button
              onClick={logOut}
              className="font-medium py-1.5 pl-2 px-16 hover:bg-indigo-700 hover:text-white"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
