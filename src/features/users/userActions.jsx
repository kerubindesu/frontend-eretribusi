import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosJWT from "../../app/axiosJWT";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async ({ limit, q }) => {
    const response = await axiosJWT.get(`/users?q=${q}&limit=${limit}`);
    return response.data;
  }
);

export const getUser = createAsyncThunk("users/getUser", async (id) => {
  const response = await axiosJWT.get(`users/${id}`);
  return response.data;
});

export const createUser = createAsyncThunk(
  "users/createUser",
  async ({ createData, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.post(`/users`, createData);
      navigate(-1);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, updateData, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.patch(`/users/${id}`, updateData);
      navigate(-1);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.delete(`/users/${id}`);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
