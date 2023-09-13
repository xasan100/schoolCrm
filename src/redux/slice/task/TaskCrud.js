import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api";

export const TaskCrud = createApi({
  reducerPath: "TasksData",
  baseQuery: api,
  tagTypes: ["Tasks"],
  endpoints: (build) => ({
    getTasks: build.query({
      query: () => "tasks/",
      providesTags: ["Tasks"],
    }),
    createTask: build.mutation({
      query: (body) => ({
        url: `tasks/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: build.mutation({
      query: (body) => ({
        url: `tasks/${body.id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: build.mutation({
      query: (body) => ({
        url: `tasks/${body.id}/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = TaskCrud;
