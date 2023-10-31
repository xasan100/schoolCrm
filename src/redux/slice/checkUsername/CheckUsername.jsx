import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api";

export const CheckUserName = createApi({
  reducerPath: "AllUserNames",
  baseQuery: api,
  tagTypes: ["AllUserNames"],
  endpoints: (build) => ({
    getAllUserName: build.query({
      query: (username) => `users/check_username_exists/?username=${username}`,
      providesTags: ["AllUserNames"],
    }),
    getAllActiveUser: build.query({
      query: (id) => `users/${id}/change_active_to_passive/`,
      providesTags: ["getAllActiveUser"],
    }),
  }),
});

export const { useGetAllUserNameQuery, useGetAllActiveUserQuery } = CheckUserName;
