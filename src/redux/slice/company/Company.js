import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api";

export const CompanyCrud = createApi({
  reducerPath: "CompanyCrud",
  baseQuery: api,
  tagTypes: ["Company"],
  endpoints: (build) => ({
    getCompany: build.query({
      query: () => "company/",
      providesTags: ["Company"],
    }),
    createCompany: build.mutation({
      query: (body) => ({
        url: `company/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Company"],
    }),
    updateCompany: build.mutation({
      query: (body) => ({
        url: `Company/${body.id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Company"],
    }),
    deleteCompany: build.mutation({
      query: (body) => ({
        url: `Company/${body.id}/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Company"],
    }),
  }),
});

export const {
  useGetCompanyQuery,
  useCreateCompanyMutation,
} = CompanyCrud;
