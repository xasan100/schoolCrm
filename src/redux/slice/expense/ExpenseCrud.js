import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api";

export const ExpenseCrud = createApi({
  reducerPath: "ExpenseData",
  baseQuery: api,
  tagTypes: ["Expense"],
  endpoints: (build) => ({
    getExpenses: build.query({
      query: () => "expenses/",
      providesTags: ["Expense"],
    }),
    createExpense: build.mutation({
      query: (body) => ({
        url: `expenses/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Expense"],
    }),
    updateExpense: build.mutation({
      query: (body) => ({
        url: `expenses/${body.id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Expense"],
    }),
    deleteExpense: build.mutation({
      query: (body) => ({
        url: `expenses/${body.id}/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Expense"],
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = ExpenseCrud;
