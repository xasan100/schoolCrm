import axios from "axios";
let url = "https://alcrm.pythonanywhere.com/api/v1/"
// let url = "http://192.168.0.162:8000/api/v1/"

export const instance = axios.create({
  baseURL: `${url}`,
  timeout: 1000,
});
