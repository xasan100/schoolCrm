import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api.jsx";

export const ParentProfileApi = createApi({
  baseQuery: api,
  endpoints: (build) => ({
    getParentAttendance: build.query({
      query: () => "parents/get_children_attendances/",
    }),
    getParentChildren: build.query({
      query: () => "parents/get_children_list/",
    }),
    getParentDebts: build.query({
      query: () => "parents/children_debts/",
    }),
    getParentPays: build.query({
      query: () => "parents/children_pays/",
    }),
  }),
});

export const {
  useGetParentAttendanceQuery,
  useGetParentChildrenQuery,
  useGetParentDebtsQuery,
  useGetParentPaysQuery,
} = ParentProfileApi;