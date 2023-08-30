import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api";

export const TeachersCrud = createApi({
  reducerPath: "TeachersData",
  baseQuery: api,
  tagTypes: ["Teachers"],
  endpoints: (build) => ({
    getTeachers: build.query({
      query: () => "teacher",
      providesTags: ["Teachers"],
    }),
    createTeacher: build.mutation({
      query: (body) => ({
        url: `teacher/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Teachers"],
    }),
    updateTeacher: build.mutation({
      query: (body) => ({
        url: `teacher/${body.id}/`,
        method: "PUT",
        body,
      }),
    }),
    deleteTeacher: build.mutation({
      query: (body) => ({
        url: `teacher/${body.id}/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Teachers"],
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} = TeachersCrud;
