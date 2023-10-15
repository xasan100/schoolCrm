import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Authentication } from "../../context/AuthContext";
// import Loading from "../../examples/loading/Loading";

const allowedRoutesForManager = [
  "/sales-department",
  "/sales-department/details",
  "/sales-department/details/type/:id",
  "/buildings",
  "/buildings/details/:id",
  "/orders",
  "/apartments",
  "/customers/*",
  "/profile",
  "/busy-apartments",
  "/cassier",
  "/currencies",
];

function PrivateRoute({ children, path }) {
  const { profile } = useContext(Authentication);
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, [location]);

  if (isChecking) {
    return (
      <div className="h-screen w-full fixed top-0 left-0 z-[100] bg-white flex items-center justify-center">
        <h1>Loading ...</h1>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // SuperAdmin uchun barcha sahifalarga kirishga ruxsat berilgan
  if (profile?.roles?.role_name === "SuperAdmin") {
    return children;
  }

  if (!allowedRoutesForManager.includes(path)) {
    return <Navigate to={allowedRoutesForManager[0]} replace />;
  }
  // Agar foydalanuvchi oddiy foydalanuvchi bo'lsa va uga ruxsat berilgan yo'lda bo'lmasa
  return children;
}

export default PrivateRoute;
