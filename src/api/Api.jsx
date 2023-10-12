import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
let url = "https://alcrm.pythonanywhere.com/api/v1/";

export const api = fetchBaseQuery({
  baseUrl: url,
});
