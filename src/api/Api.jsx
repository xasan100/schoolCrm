import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
let url = "https://alcrm.pythonanywhere.com/api/v1/";
let local ="http://192.168.1.68:8000/api/v1/"
export const api = fetchBaseQuery({
  baseUrl: local,
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});
