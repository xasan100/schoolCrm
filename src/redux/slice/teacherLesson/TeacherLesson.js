import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api";

export const TeacherLesson = createApi({
  reducerPath: "TeacherLesson",
  baseQuery: api,
  tagTypes: ["TeacherLesson"],
  endpoints: (build) => ({
    getTeacherLesson: build.query({
      query: () => "teachers/get_lesson_with_file_url/",
      providesTags: ["TeacherLesson"],
    }),
    createTeacherLesson: build.mutation({
      query: (body) => ({
        url: `teachers/add_lesson_with_file/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["TeacherLesson"],
    }),
  }),
});

export const { useGetTeacherLessonQuery, useCreateTeacherLessonMutation } =
  TeacherLesson;
