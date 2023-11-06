import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api";

export const ChatCrud = createApi({
  reducerPath: "ChatMessage",
  baseQuery: api,
  tagTypes: ["Chat"],
  endpoints: (build) => ({
    getChat: build.query({
      query: () => "parent_comments/get_with_parent/",
      providesTags: (result) => 
        result ? [{ type: "Chat", id: 'LIST' }] : []
    }),
    getParentChat: build.query({
      query: () => "parent_comments/list_comments/",
      providesTags: (result) =>
        result ? [{ type: "Chat", id: 'LIST' }] : []
    }),
    createChat: build.mutation({
      query: (body) => ({
        url: `parent_comments/`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Chat", id: 'LIST' }],
    }),
  }),
});

export const { useGetChatQuery, useCreateChatMutation,
  useGetParentChatQuery,
} = ChatCrud;

