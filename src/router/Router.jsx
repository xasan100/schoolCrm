import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout.jsx";
import menuItems from "../mock/menu.js";
import Sigin from "../components/login/sigin/index.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Sigin />} />
        <Route element={<Layout />}>
          {menuItems?.map(({ path, element, id }) => (
            <Route key={id} path={path} element={element} />
          ))}
        </Route>
        {/* Redirection */}
        {/* 404 Route */}
        <Route path="*" element={<h1>404 NOT FOUND</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
