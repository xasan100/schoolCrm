import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../../components/context/index";
// import Loading from "../../examples/loading/Loading";

const pathValues = [
  "/",
  "/income",
  "/expense",
  "/sciences",
  "/classes",
  "/rooms",
  "/lesson-table",
  "/teachers",
  "/students",
  "/parents",
  "/tasks",
  "/attandance",
  "/staffs",
  "/users",
  "/chat-parent",
  "/teacher-profile",
];

function PrivateRoute({ children, path }) {
  const { profile } = useContext(ThemeContext);
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
  if (profile?.user.type_user ) {
    return children;
  }

  if (pathValues.includes(path)) {
    return <Navigate to={pathValues[0]} replace />;
  }
  // Agar foydalanuvchi oddiy foydalanuvchi bo'lsa va uga ruxsat berilgan yo'lda bo'lmasa
  return children;
}

export default PrivateRoute;
