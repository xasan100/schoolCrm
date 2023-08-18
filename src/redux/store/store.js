import { configureStore } from "@reduxjs/toolkit";
import adminTypeGet from "../slice/admins/adminTypeSelectGet/index.js";
import loginAdminThunk from "../slice/login/post/index.js";
import permissionGet from "../slice/admins/permission/permissionGet/index.jsx"
import adminCustomGet from "../slice/admins/adminTypeCustom/index.js";

export default configureStore({
    reducer: {
        loginAdminThunk,
        adminTypeGet,
        permissionGet,
        adminCustomGet,
    }
})