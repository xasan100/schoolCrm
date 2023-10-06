import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api.jsx"

export const TotalCrud = createApi({
    reducerPath: 'TotalCrud',
    baseQuery: api,
    endpoints: (build) => ({
        getTotal: build.query({
            query: () => "general_statistics/",
        }),
    }),

});

export const {
    useGetTotalQuery,
} = TotalCrud