import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api";

export const TeachersCrud = createApi({
  reducerPath: "TeachersData",
  baseQuery: api,
  tagTypes: ["Teachers"],
  endpoints: (build) => ({
    getTeachers: build.query({
      query: () => "teachers/",
      providesTags: ["Teachers"],
    }),

    getTeachersbusy: build.query({
      query: () => "teachers/teachers_for_class/",
      providesTags: ["Teachers"],
    }),
    getTeachersClass: build.query({
      query: () => "teachers/get_class_of_teacher/",
      providesTags: ["Teachers"],
    }),
    getTeachersSalary: build.query({
      query: (id) => `expenses/?user=${id}`,
      providesTags: ["Teachers"],
    }),
    createTeacher: build.mutation({
      query: (body) => ({
        url: `teachers/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Teachers"],
    }),
    updateTeacher: build.mutation({
      query: (body) => ({
        url: `teachers/${body.get("id")}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Teachers"],
    }),
    deleteTeacher: build.mutation({
      query: (body) => ({
        url: `teachers/${body.id}/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Teachers"],
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useGetTeachersbusyQuery,
  useGetTeachersClassQuery,
  useGetTeachersSalaryQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} = TeachersCrud;
