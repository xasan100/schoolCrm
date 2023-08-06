import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.1.81:8000/api/v1/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});
