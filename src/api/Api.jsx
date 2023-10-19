import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
let url = "https://alcrm.pythonanywhere.com/api/v1/";

const getToken = () => {
  const token = sessionStorage.getItem("token");
  return token;
};
const token = getToken();
export const api = fetchBaseQuery({
  baseUrl: url,
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});
