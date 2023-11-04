import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api";

export const StudenTaskCrud = createApi({
  reducerPath: "StudenTaskData",
  baseQuery: api,
  tagTypes: ["StudenTask"],
  endpoints: (build) => ({
    getStudenTask: build.query({
      query: () => "students/student_tasks/",
      providesTags: ["StudenTask"],
    }),

    getTeachersbusy: build.query({
      query: () => "teachers/teachers_for_class/",
      providesTags: ["StudenTask"],
    }),
    getTeachersClass: build.query({
      query: () => "teachers/get_class_of_teacher/",
      providesTags: ["StudenTask"],
    }),
    getTeachersSalary: build.query({
      query: (id) => `expenses/?user=${id}`,
      providesTags: ["StudenTask"],
    }),

  }),
});

export const {
  useGetStudenTaskQuery,
  useGetTeachersbusyQuery,
  useGetTeachersClassQuery,
  useGetTeachersSalaryQuery,
} = StudenTaskCrud;
