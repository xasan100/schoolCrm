import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../../components/context/index";
import { toast } from "react-toastify";

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
];
const Manager = [
  "/",
  "/sciences",
  "/classes",
  "/rooms",
  "/lesson-table",
  "/teachers",
  "/students",
  "/tasks",
  "/attandance",
  "/staffs",
  "/users",
  "/chat-parent",
];

const Finance = [
  "/",
  "/income",
  "/expense",
  "/students",
  "/chat-parent",
];

const Admin = [
  "/",
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

  let defaultPath = "/login";
  const userType = profile?.user?.type_user;

  switch (userType) {
    case "tasischi":
      defaultPath = pathValues.includes(path) ? path : pathValues[0];
      break;
    case "manager":
      defaultPath = Manager[0];
      break;
    case "ainance":
      defaultPath = Finance[0];
      break;
    case "admin":
      defaultPath = Admin[0];
      break;
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
      toast.warning("Sizda ushbu sahifa mavjud emas");
  }

  return path === defaultPath ? (
    children
  ) : (
    <Navigate to={defaultPath} replace />
  );
}

export default PrivateRoute;
