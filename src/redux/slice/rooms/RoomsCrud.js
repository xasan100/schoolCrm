import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api";

export const RoomsCrud = createApi({
  reducerPath: "RoomsData",
  baseQuery: api,
  tagTypes: ["Rooms"],
  endpoints: (build) => ({
    getRooms: build.query({
      query: () => "rooms",
      providesTags: ["Rooms"],
    }),
    createRoom: build.mutation({
      query: (body) => ({
        url: `rooms/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Rooms"],
    }),
    updateRoom: build.mutation({
      query: (body) => ({
        url: `rooms/${body.get("id")}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Rooms"],
    }),
    deleteRoom: build.mutation({
      query: (body) => ({
        url: `rooms/${body.id}/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Rooms"],
    }),
  }),
});

export const {} = RoomsCrud;
