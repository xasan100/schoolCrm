import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api";

export const TeacherTaskCrud = createApi({
  reducerPath: "TeacherTasksData",
  baseQuery: api,
  tagTypes: ["TeacherTasks"],
  endpoints: (build) => ({
    getTeacherTasks: build.query({
      query: () => "teachers/get_task_to_class/",
      providesTags: ["TeacherTasks"],
    }),
    createTeacherTask: build.mutation({
      query: (body) => ({
        url: `teachers/add_task_to_class/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["TeacherTasks"],
    }),
    updateTeacherTask: build.mutation({
      query: (body) => ({
        url: `teachers/add_task_to_class/${body.id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["TeacherTasks"],
    }),
    deleteTeacherTask: build.mutation({
      query: (body) => ({
        url: `teachers/add_task_to_class/${body.id}/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["TeacherTasks"],
    }),
  }),
});

export const {
  useGetTeacherTasksQuery,
  useCreateTeacherTaskMutation,
  useUpdateTeacherTaskMutation,
  useDeleteTeacherTaskMutation,
} = TeacherTaskCrud;
