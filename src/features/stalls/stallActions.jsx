import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosJWT from "../../app/axiosJWT";

export const getStalls = createAsyncThunk(
  "stalls/getStalls",
  async ({ limit, q }) => {
    const response = await axiosJWT.get(`/stalls?q=${q}&limit=${limit}`);

    return response.data;
  }
);

export const getFreeStalls = createAsyncThunk(
  "stalls/getStalls",
  async ({ q }) => {
    const response = await axiosJWT.get(`/stalls/free?q=${q}`);

    return response.data;
  }
);

export const getStall = createAsyncThunk(
  "stalls/getStall",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.get(`/stalls/${id}`);

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
      const response = await axiosJWT.post(`/stalls`, createData);
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
      const response = await axiosJWT.patch(`/stalls/${id}`, updateData);
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
      const response = await axiosJWT.delete(`/stalls/${id}`);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
