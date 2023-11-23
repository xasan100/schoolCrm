import { LuLayoutDashboard, LuLineChart } from "react-icons/lu";
import { LiaChalkboardTeacherSolid, LiaUsersCogSolid } from "react-icons/lia";
import { PiStudent, PiUsersBold, PiUsersThree } from "react-icons/pi";
import {
  MdOutlineAttachMoney,
  MdOutlineMoneyOffCsred,
  MdCastForEducation,
} from "react-icons/md";
import Users from "../pages/Users.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Teachers from "../pages/Teachers.jsx";
import { BsChatDots, BsTable } from "react-icons/bs";
import { BiTask } from "react-icons/bi";
import Attendence from "../pages/Attendence.jsx";
import Students from "../pages/Students.jsx";
import Sciences from "../pages/Sciences.jsx";
import Staff from "../pages/Staff.jsx";
import Rooms from "../pages/Rooms.jsx";
import StudentsClass from "../pages/StudentsClas.jsx";
import Task from "../pages/Task.jsx";
import ChatParentPage from "../pages/ChatParent.jsx";
import Lessons from "../pages/Lessons.jsx";
import Income from "../pages/Income.jsx";
import Parents from "../pages/Parents.jsx";
import StudentProfilePage from "../pages/Student-profile.jsx";
import { AiOutlineUserAdd } from "react-icons/ai";
import TeacherTab from "../pages/TeachersProfile.jsx";
import PersonalTab from "../components/ParentPersonal/parent_tab/index.jsx";
import Expenses from "../pages/Expenses.jsx";
// import PersonalTab from "../components/ParentPersonal/parent_tab/index.jsx";

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
    path: '/analiytics',
    admins: ['Tasischi', 'Manager'],
    private: true,
    submenu: [
      {
        id: 8,
        title: "Kirim",
        path: "/income",
        private: true,
        hidden: true,
        element: <Income />,
        icon: <MdOutlineAttachMoney />,
      },
      {
        id: 9,
        title: "Chiqim",
        path: "/expense",
        private: true,
        hidden: true,
        element: <Expenses />,
        icon: <MdOutlineMoneyOffCsred />,
      },
    ],
    icon: <LuLineChart />,
  },
  {
    id: 10,
    title: "Ta'lim",
    path: '/education',
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
        element: <Lessons />,
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
    id: 17,
    title: "Ota-Onalar",
    path: "/parents",
    private: true,
    hidden: true,
    element: <Parents />,
    icon: <PiUsersBold />,
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
  {
    id: 16,
    title: "Xabarnomalar",
    path: "/chat-parent",
    private: true,
    hidden: true,
    element: <ChatParentPage />,
    icon: <BsChatDots />,
  },
  {
    id: 18,
    title: "Shaxsiy Kabinet",
    path: "/student-profile",
    private: false,
    hidden: false,
    element: <StudentProfilePage />,
    icon: <AiOutlineUserAdd />,
  },
  {
    id: 19,
    title: "Shaxsiy Kabinet",
    path: "/parent-profile",
    private: false,
    hidden: false,
    element: <PersonalTab />,
    icon: <AiOutlineUserAdd />,
  },
  {
    id: 20,
    title: "Shaxsiy Kabinet",
    path: "/teacher-profile",
    private: false,
    hidden: false,
    element: <TeacherTab />,
    icon: <AiOutlineUserAdd />,
  },
];

export default menuItems;


