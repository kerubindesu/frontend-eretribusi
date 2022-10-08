import axios from "axios";
import { refresh } from "../features/auth/authActions";

let store;
export const injectStore = (_store) => {
  store = _store;
};

const axiosJWT = axios.create({ baseURL: "http://localhost:4000/api" });

axiosJWT.interceptors.request.use(async (config) => {
  await store.dispatch(refresh());

  const token = await store.getState().auth.token;

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default axiosJWT;
