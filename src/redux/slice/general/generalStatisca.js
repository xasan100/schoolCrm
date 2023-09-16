import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api.jsx"

export const generalStatisticsGet = createApi({
    reducerPath: 'General',
    baseQuery: api,
    endpoints: (build) => ({
        getGenral: build.query({
            query: () => "general_statistics/",
        }),

    }),

});

export const {
    useGetGenralQuery
} = generalStatisticsGet