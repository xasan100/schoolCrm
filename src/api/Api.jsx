import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
let url = "http://192.168.1.134:8000/api/v1/";

export const api = fetchBaseQuery({
  baseUrl: url,
});
