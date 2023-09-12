import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
let url = "https://alxcrm.pythonanywhere.com/swagger/";

export const api = fetchBaseQuery({
  baseUrl: url,
});
