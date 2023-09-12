import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api.jsx"

export const UserCrud = createApi({
    reducerPath: 'UserCrud',
    baseQuery: api,
    tagTypes: ['UserCrud'],
    endpoints: (build) => ({
        getUser: build.query({
            query: () => "admins/",
            providesTags: ['UserCrud'],
        }),
        createUser: build.mutation({
            query: (body) => ({
                url: 'admins/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ["UserCrud"]
        }),
        updateUser: build.mutation({
            query: (body) => ({
                url: `admins/${body.get("id")}/`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["UserCrud"],
        }),
        deleteUser: build.mutation({
            query: (body) => ({
                url: `admins/${body.id}`,
                method: 'DELETE',
                body,
            }),
            invalidatesTags: ["UserCrud"]
        }),
    }),

});

export const {
    useGetUserQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = UserCrud