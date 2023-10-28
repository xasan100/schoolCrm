import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout.jsx";
import Sigin from "../components/sigin/index.jsx";
import menuItems from "../mock/menu.js";
import Error from "./errorPage.jsx";
import PrivateRoute from "./PrivateRouter/PrivateRoute.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Sigin />} />
        <Route element={<Layout />}>
          {menuItems?.flatMap((menu) => [
              {
                id: menu.id,
                path: menu.path,
                element: menu.element,
                private: menu.private,
              },
              ...(menu.submenu?.map((sub) => ({
                id: sub.id,
                path: sub.path,
                element: sub.element,
                private: sub.private,
              })) || []),
            ])
            .map((item) => (
              <>
                  <Route
                    key={item.id}
                    path={item.path}
                    element={
                      <PrivateRoute path={item.path}>{item.element}</PrivateRoute>
                    }
                  />
              </>
            ))}
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
