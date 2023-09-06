import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api";

export const SciencesCrud = createApi({
  reducerPath: "SciencesData",
  baseQuery: api,
  tagTypes: ["Sciences"],
  endpoints: (build) => ({
    getSciences: build.query({
      query: () => "science",
      providesTags: ["Sciences"],
    }),
    createScience: build.mutation({
      query: (body) => ({
        url: `science/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Sciences"],
    }),
    updateScience: build.mutation({
      query: (body) => ({
        url: `science/${body.id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Sciences"],
    }),
    deleteScience: build.mutation({
      query: (body) => ({
        url: `science/${body.id}/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Sciences"],
    }),
  }),
});

export const {
  useGetSciencesQuery,
  useCreateScienceMutation,
  useUpdateScienceMutation,
  useDeleteScienceMutation,
} = SciencesCrud;
