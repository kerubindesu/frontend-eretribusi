import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosJWT from "../../app/axiosJWT";

export const getRetributions = createAsyncThunk(
  "retributions/getRetributions",
  async ({ limit, q }) => {
    const response = await axiosJWT.get(`/retributions?q=${q}&limit=${limit}`);

    return response.data;
  }
);

export const getRetribution = createAsyncThunk(
  "retributions/getRetribution",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.get(`/retributions/${id}`);

      return response.data;
    } catch (err) {
      console.clear();
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getUserRetribution = createAsyncThunk(
  "retributions/getUserRetribution",
  async (uid, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.get(`/retributions/user`);

      return response.data;
    } catch (err) {
      console.clear();
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const createRetribution = createAsyncThunk(
  "retributions/createRetribution",
  async ({ createData, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.post(`/retributions`, createData);
      navigate(-1);

      return response.data;
    } catch (err) {
      console.clear();
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updateRetribution = createAsyncThunk(
  "retributions/updateRetribution",
  async ({ id, updateData, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.patch(`/retributions/${id}`, updateData);
      navigate("/retributions");

      return response.data;
    } catch (err) {
      console.clear();
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const deleteRetribution = createAsyncThunk(
  "retributions/deleteRetribution",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.delete(`/retributions/${id}`);

      return response.data;
    } catch (err) {
      console.clear();
      return rejectWithValue(err.response.data.message);
    }
  }
);
