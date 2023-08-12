import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import menuItems from "../../mock/menu";
import Logo from "../../assets/logo.png";

export default function Sidebar() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const handleMenuItemClick = (path, item) => {
    setActive(item.id);
    navigate(path);
  };

  return (
    <div className="fixed top-0 left-0 flex flex-col justify-between gap-5 h-screen py-4 w-76 shadow-xl z-10 bg-white">
      <div className="flex justify-center">
        <img src={Logo} alt="logo" className="w-3/4" />
      </div>
      <ul className="flex flex-col list-none">
        {menuItems.map((item) => (
          <li
            className={`flex items-center gap-4 py-2 px-4 text-lg font-semibold  rounded-r-3xl cursor-pointer  ${
              active === item.id ? "bg-primary text-white" : "text-gray-700"
            }`}
            key={item.id}
            onClick={() => handleMenuItemClick(item.path, item)}
          >
            <span className="text-2xl">{item.icon}</span> {item.title}
          </li>
        ))}
      </ul>
      <div className="flex justify-center">
        <button className="py-2 px-12 rounded-3xl text-lg bg-primary text-white">
          Chiqish
        </button>
      </div>
    </div>
  );
}
