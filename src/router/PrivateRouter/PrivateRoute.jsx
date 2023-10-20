import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../../components/context/index";
import { toast } from "react-toastify";

const pathValues = [
  "/",
  // ... boshqa yo'llar
];

const teacherPath = ["/teacher-profile"];
const studentPath = ["/student-profile"];
const parentPath = ["/parent-profile"];

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

  // ...
  const userType = profile?.user?.type_user;
  let defaultPath = "/login"; // Agar foydalanuvchi turi tanlanmagan bo'lsa, login sahifasiga qaytarish

  console.log("User Type:", userType);
  console.log("Path:", path);

  switch (userType) {
    case "admin":
      return children; // Admin uchun barcha yo'llar ochiq
    case "teacher":
      defaultPath = teacherPath[0];
      break;
    case "student":
      defaultPath = studentPath[0];
      break;
    case "parent":
      defaultPath = parentPath[0];
      break;
    default:
      toast.warning("Sizda ushbu saihfa mavjud emas");
      break;
  }

  // Agar foydalanuvchi turi uchun ruxsat etilgan yo'l topilsa, shu yo'lga qaytarish
  return path === defaultPath ? (
    children
  ) : (
    <Navigate to={defaultPath} replace />
  );
  // ...
}

export default PrivateRoute;
