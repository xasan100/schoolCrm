import { configureStore } from "@reduxjs/toolkit"; 
import loginAdminThunk from "../slice/login/post/index.js"
export default configureStore({
    reducer: {
        loginAdminThunk
    }
})