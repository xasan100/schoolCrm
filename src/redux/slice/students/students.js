import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api.jsx"

export const StudentsCrud = createApi({
    reducerPath: 'StudentData',
    baseQuery: api,
    tagTypes: ['Students'],
    endpoints: (build) => ({
        getStudents: build.query({
            query: () => "students/",
            providesTags: ['Students'],
        }),
        createStudent: build.mutation({
            query: (body) => ({
                url: 'students/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ["Students"]
        }),
        transformResponse: (response, meta) => {
            return {
                data: response, // Buni qo'llash uchun, natijadagi ma'lumotni qaytaradi.
                status: meta.status, // Javob statusini qaytaradi.
            };
        },
        invalidatesTags: ["Students"],

        updateStudents: build.mutation({
            query: (body) => ({
                url: `students/${body.get("id")}/`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Students"],
        }),
        deleteStudents: build.mutation({
            query: (body) => ({
                url: `students/${body.id}`,
                method: 'DELETE',
                body,
            }),
            invalidatesTags: ["Students"]
        }),
    }),

});

export const {
    useCreateStudentMutation,
    useGetStudentsQuery,
    useUpdateStudentsMutation,
    useDeleteStudentsMutation,
} = StudentsCrud