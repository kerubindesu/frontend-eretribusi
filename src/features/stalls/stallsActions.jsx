import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../app/API";

export const getStalls = createAsyncThunk(
  "stalls/getStalls",
  async ({ limit, q }) => {
    const response = await API.get(`/stalls?q=${q}&limit=${limit}`);
    return response.data;
  }
);

export const getStallById = createAsyncThunk(
  "stalls/getStallById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/stalls/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const createStall = createAsyncThunk(
  "stalls/createStall",
  async ({ createData, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/stalls`, createData);
      navigate(-1);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const updateStall = createAsyncThunk(
  "stalls/updateStall",
  async ({ id, updateData, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/stalls/${id}`, updateData);
      navigate(-1);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const deleteStall = createAsyncThunk(
  "stalls/deleteStall",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/stalls/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
