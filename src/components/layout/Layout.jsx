import React from "react";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Topheder from "../topheader/TopHeader.jsx"
export default function Layout() {
  return (
    <div>
      <Topheder />
      <div className="grid grid-cols-[1fr,5fr]">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}
