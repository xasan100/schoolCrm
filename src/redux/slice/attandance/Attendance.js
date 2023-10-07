import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api.jsx"

export const AttendanceCrud = createApi({
  reducerPath: 'Attendance',
  baseQuery: api,
  tagTypes: ['Attendance'],
  endpoints: (build) => ({
    getAttendance: build.query({
      query: () => "attendances/",
      providesTags: ['Attendance'],
    }),
    createAttendance: build.mutation({
      query: (body) => ({
        url: 'attendances/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ["Attendance"]
    }),
    updateAttendance: build.mutation({
      query: (body) => ({
        url: `attendances/${body.id}/`,
        method: 'PUT',
        body,
      }),
    }),
    deleteAttendance: build.mutation({
      query: (body) => ({
        url: `attendances/${body.id}`,
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
  useUpdateAttendanceMutation,
  useDeleteAttendanceMutation,
} = AttendanceCrud;