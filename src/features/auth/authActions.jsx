import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../app/API";

export const getUserAuth = createAsyncThunk("user/getUserAuth", async () => {
  const response = await API.get(`/users/auth`);
  return response.data;
});

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async ({ limit, q }) => {
    const response = await API.get(`/users?q=${q}&limit=${limit}`);
    return response.data;
  }
);

export const getUser = createAsyncThunk("user/getUser", async (id) => {
  const response = await API.get(`users/${id}`);
  return response.data;
});

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/users/login`, {
        username,
        password,
      });
      localStorage.setItem("userToken", JSON.stringify(response.data));
      return response.data;
    } catch (err) {
      const message = err.response.data;
      return rejectWithValue(message);
    }
  }
);

export const userRegister = createAsyncThunk(
  "user/userRegister",
  async (
    { name, address, business_type, username, role, password },
    { rejectWithValue }
  ) => {
    try {
      const response = await API.post(`/users/register`, {
        name,
        address,
        business_type,
        username,
        role,
        password,
      });
      localStorage.setItem("userToken", JSON.stringify(response.data));
      return response.data;
    } catch (err) {
      const message = err.response.data;
      return rejectWithValue(message);
    }
  }
);
