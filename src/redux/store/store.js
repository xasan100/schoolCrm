import { configureStore } from "@reduxjs/toolkit";
import adminTypeGet from "../slice/admins/adminTypeGet/index.js";
import loginAdminThunk from "../slice/login/post/index.js";
import permissionGet from "../slice/admins/permission/permissionGet/index.jsx"
export default configureStore({
    reducer: {
        loginAdminThunk,
        adminTypeGet,
        permissionGet,
    }
})