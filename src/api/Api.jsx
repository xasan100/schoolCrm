import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
let url = "https://alcrm.pythonanywhere.com/api/v1/";
let local = `${window.location.protocol}//${window.location.host}:8000`
// let url = `${location.protocol}//${location.host}:8000`

export const api = fetchBaseQuery({
  baseUrl: local,
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});
