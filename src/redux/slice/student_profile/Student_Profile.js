import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api.jsx";

export const StudentProfileApi = createApi({
  reducerPath: 'StudentProfile',
  baseQuery: api,  // This is the base API configuration from your imported "Api.jsx".
  tagTypes: ['StudentProfile'],
  endpoints: (build) => ({
    // Define query endpoints for different types of data.
    getStudenAttendance: build.query({
      query: () => "students/get_student_attendances/",
      providesTags: ['tagTypes'],
     
    }),
    getStudentDebts: build.query({
      query: () => "students/student_debts/",
      providesTags: ['tagTypes'],

    }),
    getStudentPays: build.query({
      query: () => "students/student_pays/",
      providesTags: ['tagTypes'],

    }),
  }),
});

export const {
  useGetStudenAttendanceQuery,
  useGetStudentDebtsQuery,
  useGetStudentPaysQuery,
} = StudentProfileApi;