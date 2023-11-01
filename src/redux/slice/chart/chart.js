import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api";

export const ChartCrud = createApi({
  reducerPath: "Chart",
  baseQuery: api,
  tagTypes: ["Chart"],
  endpoints: (build) => ({
    getChart: build.query({
      query: () => "finance/data/",
      providesTags: ["Chart"],
    }),
  }),
});

export const { useGetChartQuery } = ChartCrud;
