import { LuLayoutDashboard, LuLineChart } from "react-icons/lu";
import { LiaChalkboardTeacherSolid, LiaUsersCogSolid } from "react-icons/lia";
import { PiStudent, PiUsersThree } from "react-icons/pi";
import { MdOutlineAttachMoney, MdOutlineMoneyOffCsred } from "react-icons/md";
import Users from "../pages/Users.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Teachers from "../pages/Teachers.jsx";
import { BsTable } from "react-icons/bs";
import Attendence from "../pages/Attendence.jsx";
import StudentsCom from "../components/students/studentTable.jsx";
import Students from "../pages/Students.jsx";

const menuItems = [
  {
    id: 0,
    element: <Dashboard />,
    title: "Bosh sahifa",
    path: "/",
    private: true,
    hidden: true,
    icon: <LuLayoutDashboard />,
  },
  {
    id: 1,
    path: "/analiytics",
    title: "Analiytika",
    private: true,
    hidden: true,
    element: "SD",
    icon: <LuLineChart />,
  },
  {
    id: 2,
    title: "O'qituvchilar",
    path: "/teachers",
    private: true,
    hidden: true,
    element: <Teachers />,
    icon: <LiaChalkboardTeacherSolid />,
  },
  {
    id: 3,
    title: "O'quvchilar",
    path: "/students",
    private: true,
    hidden: true,
    element: <Students />,
    icon: <PiStudent />,
  },
  {
    id: 8,
    title: "Davomat",
    path: "/attandance",
    private: true,
    hidden: true,
    element: <Attendence />,
    icon: <BsTable />,
  },
  {
    id: 4,
    title: "Xodimlar",
    path: "/staffs",
    private: true,
    hidden: true,
    element: "SD",
    icon: <PiUsersThree />,
  },
  {
    id: 5,
    title: "Foydalanuvchilar",
    path: "/users",
    private: true,
    hidden: true,
    element: <Users />,
    icon: <LiaUsersCogSolid />,
  },
  {
    id: 6,
    title: "Kirim",
    path: "/income",
    private: true,
    hidden: true,
    element: "SD",
    icon: <MdOutlineAttachMoney />,
  },
  {
    id: 7,
    title: "Chiqim",
    path: "/expense",
    private: true,
    hidden: true,
    element: "SD",
    icon: <MdOutlineMoneyOffCsred />,
  },
];



export default menuItems;
