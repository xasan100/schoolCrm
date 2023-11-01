import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api.jsx";

export const ParentProfileApi = createApi({
  baseQuery: api,
  tagTypes: ['ParentProfile'],

  endpoints: (build) => ({
    getParentAttendance: build.query({
      query: () => "parents/get_children_attendances/",
      providesTags: ['tagTypes'],

    }),
    getParentChildren: build.query({
      query: () => "parents/get_children_list/",
      providesTags: ['tagTypes']

    }),
    getParentDebts: build.query({
      query: () => "parents/children_debts/",
      providesTags: ['tagTypes']

    }),
    getParentPays: build.query({
      query: () => "parents/children_pays/",
      providesTags: ['tagTypes']

    }),
  }),
});

export const {
  useGetParentAttendanceQuery,
  useGetParentChildrenQuery,
  useGetParentDebtsQuery,
  useGetParentPaysQuery,
} = ParentProfileApi;