import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../app/API";

export const getRetributions = createAsyncThunk(
  "retributions/getRetributions",
  async ({ limit, q }) => {
    const response = await API.get(`/retributions?q=${q}&limit=${limit}`);
    return response.data;
  }
);

export const getRetributionById = createAsyncThunk(
  "retributions/getRetributionById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/retributions/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const createRetribution = createAsyncThunk(
  "retributions/createRetribution",
  async ({ createData, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/retributions`, createData);
      navigate(-1);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const updateRetribution = createAsyncThunk(
  "retributions/updateRetribution",
  async ({ id, updateData, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/retributions/${id}`, updateData);
      navigate("/retributions");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const deleteRetribution = createAsyncThunk(
  "retributions/deleteRetribution",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/retributions/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
