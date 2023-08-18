import React from "react";
import Sidebar from "../sidebar/Sidebar";
import { Navigate, Outlet } from "react-router-dom";
import Topheder from "../topheader/TopHeader.jsx";
export default function Layout() {
  const token = "1";
  return (
    <>
      {token === "1" ? (
        <div className="flex justify-end ">
          <Sidebar />
          <div className="basis-4/5 layout">
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
