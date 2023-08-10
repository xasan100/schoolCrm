import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import TopHeader from '../components/topheader/TopHeader.jsx'
import { navbar } from '../utils/navbar.js'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<TopHeader />}>
            {navbar?.map(({ path, element, id }) => (
              <Route key={id} path={path} element={element} />
            ))}
          </Route>
        {/* Redirection */}
        <Route index element={<Navigate to="/home" />} />
        {/* 404 Route */}
        <Route path="*" element={<h1>404 NOT FOUND</h1>} />
      </Routes>
    </BrowserRouter>
  )
}
