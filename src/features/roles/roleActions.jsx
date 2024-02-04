import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosJWT from "../../app/axiosJWT";

export const getRoles = createAsyncThunk(
  "roles/getRoles",
  async ({ limit, q }) => {
    const response = await axiosJWT.get(`/roles?q=${q}&limit=${limit}`);

    return response.data;
  }
);

export const getRole = createAsyncThunk(
  "roles/getRole",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.get(`/roles/${id}`);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const createRole = createAsyncThunk(
  "roles/createRole",
  async ({ createData, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.post(`/roles`, createData);
      navigate(-1);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async ({ id, updateData, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.patch(`/roles/${id}`, updateData);
      navigate(-1);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const deleteRole = createAsyncThunk(
  "roles/deleteRole",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.delete(`/roles/${id}`);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
