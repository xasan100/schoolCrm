import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api";

export const StaffCrud = createApi({
  reducerPath: "StaffData",
  baseQuery: api,
  tagTypes: ["Staff"],
  endpoints: (build) => ({
    getStaff: build.query({
      query: () => "employers/",
      providesTags: ["Staff"],
    }),
    createStaff: build.mutation({
      query: (body) => ({
        url: `employers/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Staff"],
    }),
    updateStaff: build.mutation({
      query: (body) => ({
        url: `employers/${body.get("id")}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Staff"],
    }),
    deleteStaff: build.mutation({
      query: (body) => ({
        url: `employers/${body.id}/`,
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
