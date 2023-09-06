import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { StudentsCrud } from "../slice/students/students.js";
import { TeachersCrud } from "../slice/teachers/TeachersSlice.js";
import { StaffCrud } from "../slice/staff/StaffSlice.js";
import { SciencesCrud } from "../slice/sciences/SciencesSlice.js";
import { AttendanceCrud } from "../slice/attandance/Attendance.js";
import { UserCrud } from "../slice/user/user.js"
export const store = configureStore({
  reducer: {
    [TeachersCrud.reducerPath]: TeachersCrud.reducer,
    [StudentsCrud.reducerPath]: StudentsCrud.reducer,
    [StaffCrud.reducerPath]: StaffCrud.reducer,
    [SciencesCrud.reducerPath]: SciencesCrud.reducer,
    [AttendanceCrud.reducerPath]: AttendanceCrud.reducer,
    [UserCrud.reducerPath]: UserCrud.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      TeachersCrud.middleware,
      StudentsCrud.middleware,
      AttendanceCrud.middleware,
      UserCrud.middleware,
      SciencesCrud.middleware,
      StaffCrud.middleware,
    ),
});

setupListeners(store.dispatch);
