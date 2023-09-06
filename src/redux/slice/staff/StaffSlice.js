import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api";

export const StaffCrud = createApi({
  reducerPath: "StaffData",
  baseQuery: api,
  tagTypes: ["Staff"],
  endpoints: (build) => ({
    getStaff: build.query({
      query: () => "employer",
      providesTags: ["Staff"],
    }),
    createStaff: build.mutation({
      query: (body) => ({
        url: `employer/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Staff"],
    }),
    updateStaff: build.mutation({
      query: (body) => ({
        url: `employer/${body.get("id")}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Staff"],
    }),
    deleteStaff: build.mutation({
      query: (body) => ({
        url: `employer/${body.id}/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Staff"],
    }),
  }),
});

export const {
  useGetStaffQuery,
  useCreateStaffMutation,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
} = StaffCrud;
