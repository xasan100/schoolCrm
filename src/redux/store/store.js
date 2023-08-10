import { configureStore } from "@reduxjs/toolkit";
import adminTypeGet from "../slice/admins/adminTypeGet/index.js";
import loginAdminThunk from "../slice/login/post/index.js"
export default configureStore({
    reducer: {
        loginAdminThunk,
        adminTypeGet,
    }
})