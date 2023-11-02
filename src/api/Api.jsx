import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const localApiUrl = `${window.location.protocol}//${window.location.hostname}:8000/api/v1/`;
export const apiUrl = 'https://alcrm.pythonanywhere.com/api/v1/';
export const baseUrl = apiUrl || localApiUrl;


export const api = fetchBaseQuery({
  baseUrl, 
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});
