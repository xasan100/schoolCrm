import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api.jsx";

export const StudentProfileApi = createApi({
  baseQuery: api,
  endpoints: (build) => ({
    getStudentAttendance: build.query({
      query: () => "students/get_student_attendances",
    }),
    getStudentsDebts: build.query({
      query: () => "students/student_debts/",
    }),
    getStudentsPays: build.query({
      query: () => "students/student_pays/",
    }),
  }),
});

export const {
  useGetStudentAttendanceQuery,
  useGetStudentsDebtsQuery,
  useGetStudentsPaysQuery } = StudentProfileApi;