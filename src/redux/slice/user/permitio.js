import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api.jsx"

export const permitionAdmin = createApi({
    reducerPath: 'permitionAdmin',
    baseQuery: api,
    endpoints: (build) => ({
        getPermition: build.query({
            query: () => "permissions-admin/",
        }),
    }),

});

export const {
    useGetPermitionQuery
} = permitionAdmin