import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
let url = "https://alcrm.pythonanywhere.com/api/v1/";
// let url = "http://192.168.0.162:8000/api/v1/"

export const api = fetchBaseQuery({
  baseUrl: url,
});
