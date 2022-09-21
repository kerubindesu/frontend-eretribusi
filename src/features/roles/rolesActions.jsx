import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../app/API";

export const getRoles = createAsyncThunk(
  "roles/getRoles",
  async ({ limit, q }) => {
    const response = await API.get(`/roles?q=${q}&limit=${limit}`);
    return response.data;
  }
);

export const getRoleById = createAsyncThunk(
  "roles/getRoleById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/roles/${id}`);
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
      const response = await API.post(`/roles`, createData);
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
      const response = await API.patch(`/roles/${id}`, updateData);
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
      await API.delete(`/roles/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
