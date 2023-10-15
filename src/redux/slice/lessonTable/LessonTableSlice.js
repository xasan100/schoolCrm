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

    getLessonTime: build.query({
      query: () => "lesson_times/",
      providesTags: ["getLessonTime"],
    }),
    createLessonExsel: build.mutation({
      query: (body) => ({
        url: `lessons/add_lesson_with_excel/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["LessonTable"],
    }),
  }),
});

export const {
  useGetLessonTableQuery,
  useCreateLessonExselMutation,
  useGetLessonTimeQuery,
} = LessonTableCrud;
