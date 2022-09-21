import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:4000/api" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("userToken")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("userToken")).token
    }`;
  }
  return req;
});

export default API;
