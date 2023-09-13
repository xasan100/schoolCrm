import { LuLayoutDashboard, LuLineChart } from "react-icons/lu";
import { LiaChalkboardTeacherSolid, LiaUsersCogSolid } from "react-icons/lia";
import { PiStudent, PiUsersThree, PiBooks } from "react-icons/pi";
import {
  MdOutlineAttachMoney,
  MdOutlineMoneyOffCsred,
  MdCastForEducation,
} from "react-icons/md";
import Users from "../pages/Users.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Teachers from "../pages/Teachers.jsx";
import { BsTable } from "react-icons/bs";
import { BiTask } from "react-icons/bi";
import Attendence from "../pages/Attendence.jsx";
import Students from "../pages/Students.jsx";
import Sciences from "../pages/Sciences.jsx";
import Staff from "../pages/Staff.jsx";
import LessonTable from "../pages/LessonTable.jsx";
import Rooms from "../pages/Rooms.jsx";
import StudentsClass from "../pages/StudentsClas.jsx";
import Task from "../pages/Task.jsx";

const menuItems = [
  {
    id: 0,
    element: <Dashboard />,
    title: "Boshsahifa",
    path: "/",
    private: true,
    hidden: true,
    icon: <LuLayoutDashboard />,
  },
  {
    id: 1,
    title: "Analiytika",
    private: true,
    submenu: [
      {
        id: 8,
        title: "Kirim",
        path: "/income",
        private: true,
        hidden: true,
        element: "kirim",
        icon: <MdOutlineAttachMoney />,
      },
      {
        id: 9,
        title: "Chiqim",
        path: "/expense",
        private: true,
        hidden: true,
        element: "Chiqim",
        icon: <MdOutlineMoneyOffCsred />,
      },
    ],
    icon: <LuLineChart />,
  },
  {
    id: 10,
    title: "Ta'lim",
    private: true,
    submenu: [
      {
        id: 11,
        path: "/sciences",
        title: "Fanlar",
        private: true,
        hidden: true,
        element: <Sciences />,
      },
      {
        id: 12,
        title: "Sinflar",
        path: "/classes",
        private: true,
        hidden: true,
        element: <StudentsClass />,
      },
      {
        id: 13,
        title: "Xonalar",
        path: "/rooms",
        private: true,
        hidden: true,
        element: <Rooms />,
      },
      {
        id: 14,
        title: "Dars Jadvali",
        path: "/lesson-table",
        private: true,
        hidden: true,
        element: <LessonTable />,
      },
    ],
    icon: <MdCastForEducation />,
  },
  {
    id: 3,
    title: "O'qituvchilar",
    path: "/teachers",
    private: true,
    hidden: true,
    element: <Teachers />,
    icon: <LiaChalkboardTeacherSolid />,
  },
  {
    id: 4,
    title: "O'quvchilar",
    path: "/students",
    private: true,
    hidden: true,
    element: <Students />,
    icon: <PiStudent />,
  },
  {
    id: 15,
    title: "Vazifalar",
    path: "/tasks",
    private: true,
    hidden: true,
    element: <Task />,
    icon: <BiTask />,
  },
  {
    id: 5,
    title: "Davomat",
    path: "/attandance",
    private: true,
    hidden: true,
    element: <Attendence />,
    icon: <BsTable />,
  },
  {
    id: 6,
    title: "Xodimlar",
    path: "/staffs",
    private: true,
    hidden: true,
    element: <Staff />,
    icon: <PiUsersThree />,
  },
  {
    id: 7,
    title: "Adminlar",
    path: "/users",
    private: true,
    hidden: true,
    element: <Users />,
    icon: <LiaUsersCogSolid />,
  },
];

export default menuItems;
