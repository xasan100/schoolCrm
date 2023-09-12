import React, { useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import Settings from "./Settings";
import Notification from "./Notification";

export default function TopHeader() {
  const [day, setDay] = useState(true);
  const [open, setOpen] = useState("");
  const handleChange = (title) => {
    setOpen(title);
    if (title === open) {
      setOpen("");
    }
  };
  return (
    <div className="shadow-lg flex justify-end p-4 bg-white">
      <div className="flex itmes-center gap-6">
        <span
          className={`hover:bg-gray-200 p-2 rounded-full text-3xl cursor-pointer select-none delay-150`}
          onClick={() => setDay(!day)}
        >
          {day ? <BsSun /> : <BsMoon />}
        </span>
        <span
          onClick={() => handleChange("notification")}
          className={`hover:bg-gray-200 ${
            open === "notification" && "bg-gray-200"
          } p-2 rounded-full text-3xl cursor-pointer select-none delay-150 relative`}
        >
          <FaRegBell />
          <span className="w-5 h-5 bg-red-500 rounded-full absolute -top-1 -left-1 text-[12px] text-white flex items-center justify-center">
            3
          </span>
        </span>
        <span
          onClick={() => handleChange("settings")}
          className={`hover:bg-gray-200 ${
            open === "settings" && "bg-gray-200"
          } p-2 rounded-full text-3xl cursor-pointer select-none delay-150`}
        >
          <FiSettings />
        </span>
        <Settings open={open} />
        <Notification open={open} />
      </div>
    </div>
  );
}
