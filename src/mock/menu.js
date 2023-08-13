import LoginAdminAdd from "../components/login/adminAdd/index.jsx";

const menuItems = [
  {
    id: 0,
    element: <LoginAdminAdd />,
    title: 'Dashboard',
    path: '/dashboard',

  },
  {
    id: 1,
    path: '/analiytics',
    title: "Analiytika",
    element: 'SD'
  },
  {
    id: 2,
    title: "O'quvchilar",
    path: '/teachers',
    element: 'SD'

  },
  {
    id: 3,
    title: 'students',
    path: '/students',
    element: 'SD'

  },
  {
    id: 4,
    title: 'Xodimlar',
    path: '/staffs',
    element: 'SD'

  },
  {
    id: 5,
    title: "Foydalanuvchilar",
    path: '/users',
    element: 'SD'
  },
];

export default menuItems;
