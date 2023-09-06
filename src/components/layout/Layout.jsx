import React from "react";
import Sidebar from "../sidebar/Sidebar";
import { Navigate, Outlet } from "react-router-dom";
import Topheder from "../topheader/TopHeader.jsx";
import SecondSidebar from "../sidebar/SecondSidebar";
export default function Layout() {
  const token = "1";
  return (
    <>
      {token === "1" ? (
        <div className="flex justify-end relative">
          <SecondSidebar />
          <div className="w-full layout">
            <Topheder />
            <Outlet />
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
