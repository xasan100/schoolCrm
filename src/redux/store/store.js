import { configureStore } from "@reduxjs/toolkit";
import adminTypeGet from "../slice/admins/adminTypeSelectGet/index.js";
import loginAdminThunk from "../slice/login/post/index.js";
import permissionGet from "../slice/admins/permission/permissionGet/index.jsx";
import adminCustomGet from "../slice/admins/adminTypeCustom/index.js";
import AdminDelet from "../slice/admins/adminaDelete/index.js";
<<<<<<< HEAD
import StudentsGetDispatch from "../slice/students/studentsGet/index.jsx";
import AddTeacherSlice from "../slice/teachers/AddTeacherSlice.js";
import teacherSlice from "../slice/teachers/GetTeachersSlice.js";
import teacherDeletion from "../slice/teachers/DeleteTeacher.js";
import Attendence from "../slice/attandance/GetData.js";

export default configureStore({
  reducer: {
    loginAdminThunk,
    adminTypeGet,
    permissionGet,
    adminCustomGet,
    AdminDelet,
    StudentsGetDispatch,
    AddTeacherSlice,
    teacherSlice,
    teacherDeletion,
    Attendence,
  },
});
=======
import StudentsGetDispatch from "../slice/students/studentsGet/index.jsx"
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


    }
})
>>>>>>> 74e7a5b516cb11182bea42dfff4b01ed6b4614b2
