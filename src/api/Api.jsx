import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
let url = "https://alcrm.pythonanywhere.com/api/v1/";
let local = `${window.location.protocol}//${window.location.hostname}:8000/api/v1`



export const api = fetchBaseQuery({
  baseUrl: local,
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});
