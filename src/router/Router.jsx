import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout.jsx'
import menuItems from '../mock/menu.js'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {menuItems?.map(({ path, element, id }) => (
              <Route key={id} path={path} element={element} />
            ))}
          </Route>
        {/* Redirection */}
        <Route index element={<Navigate to="/dashboard" />} />
        {/* 404 Route */}
        <Route path="*" element={<h1>404 NOT FOUND</h1>} />
      </Routes>
    </BrowserRouter>


  )
}
