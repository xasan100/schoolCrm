import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api.jsx";

export const StudentDebts = createApi({
    reducerPath: 'StudentDebts',
    baseQuery: api,  // This is the base API configuration from your imported "Api.jsx".
    tagTypes: ['StudentDebts'],
    endpoints: (build) => ({
        // Define query endpoints for different types of data.
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
            invalidatesTags: ["Students"],
        }),
    }),
});

export const {
    useGetStudenDebtsQuery,
    useUpdateStudentsDebtsMutation,

} = StudentDebts;