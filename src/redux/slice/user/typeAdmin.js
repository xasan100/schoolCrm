import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api.jsx"

export const TypeAdmin = createApi({
    reducerPath: 'TypeAdmin',
    baseQuery: api,
    endpoints: (build) => ({
        getType: build.query({
            query: () => "type-admin/",
        }),

    }),

});

export const {
    useGetTypeQuery
} = TypeAdmin