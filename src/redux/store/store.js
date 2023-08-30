import { configureStore } from "@reduxjs/toolkit";
import adminTypeGet from "../slice/admins/adminTypeSelectGet/index.js";
import loginAdminThunk from "../slice/login/post/index.js";
import permissionGet from "../slice/admins/permission/permissionGet/index.jsx";
import adminCustomGet from "../slice/admins/adminTypeCustom/index.js";
import AdminDelet from "../slice/admins/adminaDelete/index.js";
import StudentsGetDispatch from "../slice/students/studentsGet/index.jsx";
import AddTeacherSlice from "../slice/teachers/AddTeacherSlice.js";
import teacherSlice from "../slice/teachers/GetTeachersSlice.js";
import teacherDeletion from "../slice/teachers/DeleteTeacher.js";
import Attendence from "../slice/attandance/GetData.js";
import StudentDeletIdDispatch from "../slice/students/studentsDel/index.js"
export default configureStore({
    reducer: {
        loginAdminThunk,
        adminTypeGet,
        permissionGet,
        adminCustomGet,
        AdminDelet,
        StudentsGetDispatch,
        StudentDeletIdDispatch,
        AddTeacherSlice,
        teacherSlice,
        teacherDeletion,
        Attendence,
    },
});
