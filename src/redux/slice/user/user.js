import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api.jsx"

export const UserCrud = createApi({
    reducerPath: 'UserCrud',
    baseQuery: api,
    tagTypes: ['Students'],
    endpoints: (build) => ({
        getUser: build.query({
            query: () => "custom-admin/",
            providesTags: ['UserCrud'],
        }),
        createUser: build.mutation({
            query: (body) => ({
                url: 'student/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ["UserCrud"]
        }),
        transformResponse: (response, meta) => {
            return {
                data: response, // Buni qo'llash uchun, natijadagi ma'lumotni qaytaradi.
                status: meta.status, // Javob statusini qaytaradi.
            };
        },
        invalidatesTags: ["UserCrud"],

        updateUser: build.mutation({
            query: (body) => ({
                url: `custom-admin/${body.get("id")}/`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["UserCrud"],
        }),
        deleteUser: build.mutation({
            query: (body) => ({
                url: `custom-admin/${body.id}`,
                method: 'DELETE',
                body,
            }),
            invalidatesTags: ["UserCrud"]
        }),
    }),

});

export const {
    useGetUserQuery,
    useCreateUserMutaion,
    useUpdateUserMutaion,
    useDeleteUserMutaion,
} = UserCrud