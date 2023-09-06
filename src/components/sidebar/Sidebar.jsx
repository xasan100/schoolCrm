import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import menuItems from "../../mock/menu";
import Logo from "../../assets/logo.png";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function Sidebar() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown uchun yangi state

  const handleMenuItemClick = (path, item) => {
    setActive(item.id);
    navigate(path);

    // Agar "Analitik" bosilsa, dropdownni ochish/yopish
    if (item.title === "Analiytika") {
      setDropdownOpen(!dropdownOpen);
    } else {
      setDropdownOpen(false); // boshqa tugma bosilganda dropdownni yopish
    }
  };

  return (
    <div className="fixed top-0 left-0 flex flex-col justify-between gap-5 h-screen py-4 w-1/5 shadow-xl z-10">
      <div className="flex justify-center">
        <img src={Logo} alt="logo" className="w-3/4" />
      </div>
      <ul className="flex flex-col list-none">
        {menuItems.map((item) => (
          <li
            className={`flex items-start gap-4 py-2 px-4 text-lg font-semibold rounded-r-3xl cursor-pointer ${
              active === item.id ? "bg-primary text-white" : "text-gray-700"
            }`}
            key={item.id}
            onClick={() => handleMenuItemClick(item.path, item)}
          >
            <span className="text-2xl gap-2">{item.icon}</span>
            <div className="flex items-center flex-col">
              {item.title}
              {item.title === "Analiytika" && (
                <ul
                  className="ml-5 mt-2 flex flex-col list-none overflow-hidden transition-all duration-2000 ease-in-out transform origin-top"
                  style={{
                    transform: dropdownOpen ? "scaleY(1)" : "scaleY(0)",
                    maxHeight: dropdownOpen ? "200px" : "0px",
                  }}
                >
                  <li className="py-1 px-4 cursor-pointer hover:bg-gray-300">
                    Kirim
                  </li>
                  <li className="py-1 px-4 cursor-pointer hover:bg-gray-300">
                    Chiqim
                  </li>
                </ul>
              )}
            </div>
            {item.title === "Analiytika" && (
              <span className="text-2xl">
                <MdKeyboardArrowDown />
              </span>
            )}
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
