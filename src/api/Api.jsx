import axios from "axios";

export const instance = axios.create({
  baseURL: "https://alcrm.pythonanywhere.com/api/v1/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});
