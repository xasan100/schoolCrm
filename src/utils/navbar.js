import LoginAdminAdd from "../components/login/adminAdd/index.jsx";
import Login from "../components/login/sigin/index.jsx"
export const navbar = [
    // {
    //     id: 1,
    //     element: <Login />,
    //     title: 'Login',
    //     path: '/login',

    // },
    {
        id: 2,
        element: <LoginAdminAdd />,
        title: 'Admin',
        path: '/home',
        private: false,
        hidden: false,
    },

];