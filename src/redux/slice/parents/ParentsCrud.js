import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api";

export const ParentsCrud = createApi({
  reducerPath: "ParentsData",
  baseQuery: api,
  tagTypes: ["Parents"],
  endpoints: (build) => ({
    getParents: build.query({
      query: () => "parents/",
      providesTags: ["Parents"],
    }),
    createParent: build.mutation({
      query: (body) => ({
        url: `parents/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Parents"],
    }),
    updateParent: build.mutation({
      query: (body) => ({
        url: `parents/${body.id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Parents"],
    }),
    deleteParent: build.mutation({
      query: (body) => ({
        url: `parents/${body.id}/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Parents"],
    }),
  }),
});

export const {
  useGetParentsQuery,
  useCreateParentMutation,
  useUpdateParentMutation,
  useDeleteParentMutation,
} = ParentsCrud;
