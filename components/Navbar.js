import { UserContext } from "@utils/useUser";
import { useContext } from "react";

export default function Navbar() {
  const user = useContext(UserContext);
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
        <div className="w-8 h-8 rounded-full bg-indigo-700"></div>
      </div>
    </div>
  );
}
