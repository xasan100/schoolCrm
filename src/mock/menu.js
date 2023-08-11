import LoginAdminAdd from "../components/login/adminAdd/index.jsx";

const menuItems = [
  {
    id: 0,
    element: <LoginAdminAdd />,
    title: 'Dashboard',
    path: '/dashboard',
    private: true,
    hidden: true,

  },
  {
    id: 1,
    path: '/analiytics',
    title: "Analiytika",
    private: true,
    hidden: true,
    element: 'SD'
  },
  {
    id: 2,
    title: "O'quvchilar",
    path: '/teachers',
    private: true,
    hidden: true,
    element: 'SD'

  },
  {
    id: 3,
    title: 'students',
    path: '/students',
    private: true,
    hidden: true,
    element: 'SD'

  },
  {
    id: 4,
    title: 'Xodimlar',
    path: '/staffs',
    private: true,
    hidden: true,
    element: 'SD'

  },
  {
    id: 5,
    title: "Foydalanuvchilar",
    path: '/users',
    private: true,
    hidden: true,
    element: 'SD'
  },
];

export default menuItems;
