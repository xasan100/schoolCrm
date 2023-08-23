import axios from "axios";

export const instance = axios.create({
  baseURL: "http://192.168.0.162:8000/api/v1/",
  timeout: 1000,
});
