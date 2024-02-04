import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosJWT from "../../app/axiosJWT";

export const getBusinessTypes = createAsyncThunk(
  "businessTypes/getBusinessTypes",
  async ({ limit, q }) => {
    const response = await axiosJWT.get(
      `/type-of-business?q=${q}&limit=${limit}`
    );

    return response.data;
  }
);

export const getBusinessType = createAsyncThunk(
  "businessTypes/getBusinessType",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.get(`/type-of-business/${id}`);

      return response.data;
    } catch (err) {
      console.clear();
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const createBusinessType = createAsyncThunk(
  "businessTypes/createBusinessType",
  async ({ createData, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.post(`/type-of-business`, createData);
      navigate(-1);

      return response.data;
    } catch (err) {
      console.clear();
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updateBusinessType = createAsyncThunk(
  "businessTypes/updateBusinessType",
  async ({ id, updateData, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.patch(
        `/type-of-business/${id}`,
        updateData
      );
      navigate(-1);

      return response.data;
    } catch (err) {
      console.clear();
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const deleteBusinessType = createAsyncThunk(
  "businessTypes/deleteBusinessType",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.delete(`/type-of-business/${id}`);

      return response.data;
    } catch (err) {
      console.clear();
      return rejectWithValue(err.response.data.message);
    }
  }
);
