import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api.jsx";

export const StudentDebts = createApi({
    reducerPath: 'StudentDebts',
    baseQuery: api,  
    tagTypes: ['StudentDebtss'],
    endpoints: (build) => ({
        getStudenDebts: build.query({
            query: (body) => `student_debts/?student=${body.id}`,
            providesTags: ['tagTypes'],

        }),
        updateStudentsDebts: build.mutation({
            query: (body) => ({
                url: `student_debts/${body.get("id")}/`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["tagTypes"],
        }),
    }),
});

export const {
    useGetStudenDebtsQuery,
    useUpdateStudentsDebtsMutation,

} = StudentDebts;