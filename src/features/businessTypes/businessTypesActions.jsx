import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../app/API";

export const getBusinessTypes = createAsyncThunk(
  "businessTypes/getBusinessTypes",
  async ({ limit, q }) => {
    const response = await API.get(`/type-of-business?q=${q}&limit=${limit}`);
    return response.data;
  }
);

export const getBusinessTypeById = createAsyncThunk(
  "businessTypes/getBusinessTypeById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/type-of-business/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const createBusinessType = createAsyncThunk(
  "businessTypes/createBusinessType",
  async ({ createData, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/type-of-business`, createData);
      navigate(-1);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const updateBusinessType = createAsyncThunk(
  "businessTypes/updateBusinessType",
  async ({ id, updateData, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/type-of-business/${id}`, updateData);
      navigate(-1);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const deleteBusinessType = createAsyncThunk(
  "businessTypes/deleteBusinessType",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/type-of-business/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
