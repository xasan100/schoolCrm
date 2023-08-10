import React from "react";
import menuItems from "../../mock/menu";

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-5 h-screen py-4 w-72">
      <div>
        <h1 className="text-3xl font-bold">Logo</h1>
      </div>
      <ul className="flex flex-col list-none">
        {menuItems.map((item) => (
          <li
            className="py-2 px-4 text-lg font-semibold hover:bg-purple-400 delay-100"
            key={item.id}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
