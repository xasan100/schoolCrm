import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import menuItems from "../../mock/menu";
export default function Sidebar() {

  const navigate = useNavigate();
  const handleMenuItemClick = (path, item) => {
    navigate(path);
  }

  return (
    <div className="flex flex-col gap-5 h-screen py-4 w-72">

      <ul className="flex flex-col list-none">
        {menuItems.map((item) => (
          <li
            className="py-2 px-4 text-lg font-semibold hover:bg-purple-400 delay-100"
            key={item.id}
            onClick={() => handleMenuItemClick(item?.path, item)}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
