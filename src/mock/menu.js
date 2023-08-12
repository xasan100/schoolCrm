import LoginAdminAdd from "../components/login/adminAdd/index.jsx";
import { LuLayoutDashboard, LuLineChart } from "react-icons/lu";
import { LiaChalkboardTeacherSolid, LiaUsersCogSolid } from "react-icons/lia";
import { PiStudent, PiUsersThree } from "react-icons/pi";
import { MdOutlineAttachMoney, MdOutlineMoneyOffCsred } from "react-icons/md";

const menuItems = [
  {
    id: 0,
    element: <LoginAdminAdd />,
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
    element: "SD",
    icon: <LiaChalkboardTeacherSolid />,
  },
  {
    id: 3,
    title: "O'quvchilar",
    path: "/students",
    private: true,
    hidden: true,
    element: "SD",
    icon: <PiStudent />,
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
    element: "SD",
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
