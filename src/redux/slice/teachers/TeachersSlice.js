import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api";

export const TeachersCrud = createApi({
  reducerPath: "TeachersData",
  baseQuery: api,
  tagTypes: ["Staff"],
  endpoints: (build) => ({
    getTeachers: build.query({
      query: () => "teachers",
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
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} = TeachersCrud;
