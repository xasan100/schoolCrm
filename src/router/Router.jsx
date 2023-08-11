import React from "react";
import Sigin from "../components/login/sigin/index.jsx";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard.jsx";
import Layout from "../components/layout/Layout.jsx";

export default function Router() {
  return (
    <Routes>
      <Route path="login" element={<Sigin />} />
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
