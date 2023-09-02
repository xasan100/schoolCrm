import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { StudentsCrud } from "../slice/students/students.js";
import { TeachersCrud } from "../slice/teachers/TeachersSlice.js";
import {  AttendanceCrud } from "../slice/attandance/Attendance.js"
// import adminTypeGet from "../slice/admins/adminTypeSelectGet/index.js";
// import loginAdminThunk from "../slice/login/post/index.js";
// import permissionGet from "../slice/admins/permission/permissionGet/index.jsx";
// import adminCustomGet from "../slice/admins/adminTypeCustom/index.js";
// import AdminDelet from "../slice/admins/adminaDelete/index.js";
// import StudentsGetDispatch from "../slice/students/studentsGet/index.jsx";
// import AddTeacherSlice from "../slice/teachers/AddTeacherSlice.js";
// import teacherSlice from "../slice/teachers/GetTeachersSlice.js";
// import teacherDeletion from "../slice/teachers/DeleteTeacher.js";
// import Attendence from "../slice/attandance/GetData.js";


export const store = configureStore({
  reducer: {
    // loginAdminThunk,
    // adminTypeGet,
    // permissionGet,
    // adminCustomGet,
    // AdminDelet,
    // StudentsGetDispatch,
    // AddTeacherSlice,
    // teacherSlice,
    // teacherDeletion,
    // Attendence,
    [TeachersCrud.reducerPath]: TeachersCrud.reducer,
    [StudentsCrud.reducerPath]: StudentsCrud.reducer,
    [AttendanceCrud.reducerPath]: AttendanceCrud.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      TeachersCrud.middleware,
      StudentsCrud.middleware,
      AttendanceCrud.middleware,
    ),
});

setupListeners(store.dispatch);
