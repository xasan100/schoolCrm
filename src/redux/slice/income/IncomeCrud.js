import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api";

export const IncomesCrud = createApi({
  reducerPath: "IncomeData",
  baseQuery: api,
  tagTypes: ["Income"],
  endpoints: (build) => ({
    getIncomes: build.query({
      query: () => "incomes/",
      providesTags: ["Income"],
    }),
    createIncome: build.mutation({
      query: (body) => ({
        url: `incomes/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Income"],
    }),
    updateIncome: build.mutation({
      query: (body) => ({
        url: `incomes/${body.id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Income"],
    }),
    deleteIncome: build.mutation({
      query: (body) => ({
        url: `incomes/${body.id}/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Income"],
    }),
  }),
});

export const {
  useGetIncomesQuery,
  useCreateIncomeMutation,
  useUpdateIncomeMutation,
  useDeleteIncomeMutation,
} = IncomesCrud;
