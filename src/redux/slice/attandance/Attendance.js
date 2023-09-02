import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api.jsx"

export const AttendanceCrud = createApi({
  reducerPath: 'Attendance',
  baseQuery: api,
  tagTypes: ['Attendance'],
  endpoints: (build) => ({
    getAttendance: build.query({
      query: () => "davomat/",
      providesTags: ['Attendance'],
    }),
    createAttendance: build.mutation({
      query: (body) => ({
        url: 'davomat/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ["Attendance"]
    }),
    updateAttendance: build.mutation({
      query: (body) => ({
        url: `student/${body.id}/`,
        method: 'PUT',
        body,
      }),
    }),
    deleteAttendance: build.mutation({
      query: (body) => ({
        url: `student/${body.id}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ["Attendance"]
    }),
  }),

});

export const {
  useGetAttendanceQuery,
  useCreateAttendanceMutation,
  useDeleteAttendanceMutation,
} = AttendanceCrud