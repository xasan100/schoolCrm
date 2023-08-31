import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api.jsx"

export const StudentsCrud = createApi({
    reducerPath: 'StudentData',
    baseQuery: api,
    tagTypes: ['Students'],
    endpoints: (build) => ({
        getStudents: build.query({
            query: () => "student/",
            providesTags: ['Students'],
        }),
        createTeacher: build.mutation({
            query: (body) => ({
                url: 'student/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ["Students"]
        }),
        updateStudents: build.mutation({
            query: (body) => ({
                url: `student/${body.id}/`,
                method: 'PUT',
                body,
            }),
        }),
        deleteStudents: build.mutation({
            query: (body) => ({
                url: `student/${body.id}`,
                method: 'DELETE',
                body,
            }),
            invalidatesTags: ["Students"]
        }),
    }),

});

export const {
    useGetStudentsQuery,
    useUpdateStudentsMutation,
    useDeleteStudentsMutation,
} = StudentsCrud