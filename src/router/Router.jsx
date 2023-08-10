import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Dashboard from "../pages/Dashboard";

export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
