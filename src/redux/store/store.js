import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { StudentsCrud } from "../slice/students/students.js";
import { TeachersCrud } from "../slice/teachers/TeachersSlice.js";
import { StaffCrud } from "../slice/staff/StaffSlice.js";
import { SciencesCrud } from "../slice/sciences/SciencesSlice.js";
import { AttendanceCrud } from "../slice/attandance/Attendance.js";
import { UserCrud } from "../slice/user/user.js";
import { TypeAdmin } from "../slice/user/typeAdmin.js";
import { permitionAdmin } from "../slice/user/permitio.js";
import { RoomsCrud } from "../slice/rooms/RoomsCrud.js";
import { TaskCrud } from "../slice/task/TaskCrud.js";
import { StudentsClasCrud } from "../slice/studentsClas/studentsClas.js";
import { ChatCrud } from "../slice/chat/ChatCrud.js";
import { ParentsCrud } from "../slice/parents/ParentsCrud.js";
import { TotalCrud } from "../slice/general/generalStatisca.js";
import { CheckUserName } from "../slice/checkUsername/CheckUsername.jsx";
import { IncomesCrud } from "../slice/income/IncomeCrud";
import { LessonTableCrud } from "../slice/lessonTable/LessonTableSlice.js";
import { ExpenseCrud } from "../slice/expense/ExpenseCrud.js";
import { ParentProfileApi } from "../slice/parent_profile/Parent_Profile.js";
import { ChartCrud } from "../slice/chart/chart.js";
import { StudentProfileApi } from "../slice/student_profile/Student_Profile.js";
import { CompanyCrud } from "../slice/company/Company.js";
import { StudentDebts } from "../slice/students/studentsdepts.js";
import { StudenTaskCrud } from "../slice/studentTask/StudentSlice.js";
import { TeacherTaskCrud } from "../slice/classTask/classTask.js";
import { TeacherLesson } from "../slice/teacherLesson/TeacherLesson.js";
import { StudentInformationApi } from "../slice/studentsClas/studetInforamtion.js";

export const store = configureStore({
  reducer: {
    [TeachersCrud.reducerPath]: TeachersCrud.reducer,
    [StudentsCrud.reducerPath]: StudentsCrud.reducer,
    [StaffCrud.reducerPath]: StaffCrud.reducer,
    [SciencesCrud.reducerPath]: SciencesCrud.reducer,
    [AttendanceCrud.reducerPath]: AttendanceCrud.reducer,
    [UserCrud.reducerPath]: UserCrud.reducer,
    [TypeAdmin.reducerPath]: TypeAdmin.reducer,
    [permitionAdmin.reducerPath]: permitionAdmin.reducer,
    [RoomsCrud.reducerPath]: RoomsCrud.reducer,
    [TaskCrud.reducerPath]: TaskCrud.reducer,
    [StudentsClasCrud.reducerPath]: StudentsClasCrud.reducer,
    [ChatCrud.reducerPath]: ChatCrud.reducer,
    [ParentsCrud.reducerPath]: ParentsCrud.reducer,
    [TotalCrud.reducerPath]: TotalCrud.reducer,
    [CheckUserName.reducerPath]: CheckUserName.reducer,
    [IncomesCrud.reducerPath]: IncomesCrud.reducer,
    [LessonTableCrud.reducerPath]: LessonTableCrud.reducer,
    [StudentProfileApi.reducerPath]: StudentProfileApi.reducer,
    [ExpenseCrud.reducerPath]: ExpenseCrud.reducer,
    [ParentProfileApi.reducerPath]: ParentProfileApi.reducer,
    [TeacherTaskCrud.reducerPath]: TeacherTaskCrud.reducer,
    [ChartCrud.reducerPath]: ChartCrud.reducer,
    [CompanyCrud.reducerPath]: CompanyCrud.reducer,
    [StudenTaskCrud.reducerPath]: StudenTaskCrud.reducer,
    [TeacherLesson.reducerPath]: TeacherLesson.reducer,
    [StudentInformationApi.reducerPath]: StudentInformationApi.reducerPath,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      TeachersCrud.middleware,
      StudentsCrud.middleware,
      AttendanceCrud.middleware,
      UserCrud.middleware,
      SciencesCrud.middleware,
      StaffCrud.middleware,
      TypeAdmin.middleware,
      permitionAdmin.middleware,
      RoomsCrud.middleware,
      TaskCrud.middleware,
      StudentsClasCrud.middleware,
      ChatCrud.middleware,
      ParentsCrud.middleware,
      TotalCrud.middleware,
      CheckUserName.middleware,
      IncomesCrud.middleware,
      LessonTableCrud.middleware,
      StudentProfileApi.middleware,
      ExpenseCrud.middleware,
      ParentProfileApi.middleware,
      TeacherTaskCrud.middleware,
      ChartCrud.middleware,
      CompanyCrud.middleware,
      StudentDebts.middleware,
      StudenTaskCrud.middleware,
      TeacherLesson.middleware,
      StudentInformationApi.middleware
    ),
});

setupListeners(store.dispatch);
