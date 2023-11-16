import React, { useContext, useEffect, useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import Settings from "./Settings";
import Notification from "./Notification";
import { ThemeContext, useTheme } from "../context/index.jsx";

export default function TopHeader() {
  const [open, setOpen] = useState(false);
  // const [day, setDay] = useState(true);
  const { day, toggleTheme } = useTheme();
  const { profile } = useContext(ThemeContext);
  const typeUser = profile?.user?.type_user;
  useEffect(() => {
    document.body.className = day ? "light-mode" : "dark-mode";
  }, [day]);


  const handleChange = () => {
    setOpen(!open);
  };
  return (
    <div
      className={`shadow-lg flex justify-end p-4 ${day ? "light-mode" : "dark-mode"
        }`}
    >
      <div className="flex itmes-center gap-6">
        {/* <span
          className={`hover:bg-gray-200 p-2 rounded-full text-3xl cursor-pointer select-none delay-150`}
          onClick={toggleTheme}
        >
          {day ? <BsSun /> : <BsMoon />}
        </span> */}
        {/* <span
          onClick={() => handleChange("notification")}
          className={`hover:bg-gray-200 ${
            open === "notification" && "bg-gray-200"
          } p-2 rounded-full text-3xl cursor-pointer select-none delay-150 relative`}
        >
          <FaRegBell />
          <span className="w-5 h-5 bg-red-500 rounded-full absolute -top-1 -left-1 text-[12px] text-white flex items-center justify-center">
            3
          </span>
        </span> */}
        {typeUser === "admin" ? (
          <span
            onClick={handleChange}
            className={`hover:bg-gray-200 ${open && "bg-gray-200"
              } p-2 rounded-full text-3xl cursor-pointer select-none delay-150`}
          >
            <FiSettings />
          </span>
        ) : (
          <></>
        )}
        {open && <Settings skip={true} />}
        <Notification open={open} />
      </div>
    </div>
  );
}
