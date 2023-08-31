import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api";

export const Attendance = createApi({
  reducerPath: "AttendanceData",
  baseQuery: api,
  tagTypes: ["Attendance"],
  endpoints: (build) => ({
    getAttendance: build.query({
      query: () => "davomat/",
      providesTags: ["Attendance"],
    }),
    attendance: build.mutation({
      query: (body) => ({
        url: `davomat//`,
        method: "POST",
        body: {
          "user": 0,
          "davomat": "SABABLI"
        }
      }),
      invalidatesTags: ["Attendance"],
    }),
    // updateTeacher: build.mutation({
    //   query: (body) => ({
    //     url: `teacher/${body.id}/`,
    //     method: "PUT",
    //     body,
    //   }),
    // }),

    // deleteTeacher: build.mutation({
    //   query: (body) => ({
    //     url: `teacher/${body.id}/`,
    //     method: "DELETE",
    //     body,
    //   }),
    //   invalidatesTags: ["Teachers"],
    // }),
  }),
});

export const {
  useAttendanceMutation,
  useGetAttendanceQuery,
} = Attendance;
