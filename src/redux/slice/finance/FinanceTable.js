import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api";

export const FinanceCrud = createApi({
  reducerPath: "FinanceData",
  baseQuery: api,
  tagTypes: ["Finance"],
  endpoints: (build) => ({
    getFinances: build.query({
      query: () => "finances/",
      providesTags: ["Finance"],
    }),
    createFinance: build.mutation({
      query: (body) => ({
        url: `finances/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Finance"],
    }),
    updateFinance: build.mutation({
      query: (body) => ({
        url: `finances/${body.id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Finance"],
    }),
    deleteFinance: build.mutation({
      query: (body) => ({
        url: `finances/${body.id}/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Finance"],
    }),
  }),
});

export const {
  useGetFinancesQuery,
  useCreateFinanceMutation,
  useUpdateFinanceMutation,
  useDeleteFinanceMutation,
} = FinanceCrud;
