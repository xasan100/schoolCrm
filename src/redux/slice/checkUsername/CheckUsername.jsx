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
  }),
});

export const { useGetAllUserNameQuery } = CheckUserName;
