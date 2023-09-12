import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api.jsx"

export const StudentsClasCrud = createApi({
    reducerPath: 'StudentsClasData',
    baseQuery: api,
    tagTypes: ['StudentsClas'],
    endpoints: (build) => ({
        getStudentsClass: build.query({
            query: () => "classes/",
            providesTags: ['StudentsClass'],
        }),
        createStudentClass: build.mutation({
            query: (body) => ({
                url: 'classes/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ["StudentsClass"]
        }),
        transformResponse: (response, meta) => {
            return {
                data: response, // Buni qo'llash uchun, natijadagi ma'lumotni qaytaradi.
                status: meta.status, // Javob statusini qaytaradi.
            };
        },
        invalidatesTags: ["StudentsClass"],

        updateStudents: build.mutation({
            query: (body) => ({
                url: `classes/${body.get("id")}/`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["StudentsClass"],
        }),
        deleteStudentsClas: build.mutation({
            query: (body) => ({
                url: `classes/${body.id}`,
                method: 'DELETE',
                body,
            }),
            invalidatesTags: ["StudentsClass"]
        }),
    }),

});

export const {
    useGetStudentsClassQuery,
    useCreateStudentClassMutation,
    useUpdateStudentsClassMutation,
     useDeleteStudentsClasMutation,
} = StudentsClasCrud