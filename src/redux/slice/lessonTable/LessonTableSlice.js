import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api";

export const LessonTableCrud = createApi({
  reducerPath: "LessonTableData",
  baseQuery: api,
  tagTypes: ["LessonTableData"],
  endpoints: (build) => ({
    getLessonTable: build.query({
      query: () => "lessons/get_lessons_of_class/",
      providesTags: ["LessonTable"],
    }),
    createLessonExsel: build.mutation({
      query: (body) => ({
        url: `lessons/add_lesson_with_excel/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["LessonTable"],
    }),
    // updateStaff: build.mutation({
    //   query: (body) => ({
    //     url: `employers/${body.get("id")}/`,
    //     method: "PUT",
    //     body,
    //   }),
    //   invalidatesTags: ["Staff"],
    // }),
    // deleteStaff: build.mutation({
    //   query: (body) => ({
    //     url: `employers/${body.id}/`,
    //     method: "DELETE",
    //     body,
    //   }),
    //   invalidatesTags: ["Staff"],
    // }),
  }),
});

export const {
  useGetLessonTableQuery,
  useCreateLessonExselMutation,
} = LessonTableCrud;
