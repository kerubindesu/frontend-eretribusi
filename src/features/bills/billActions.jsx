import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosJWT from "../../app/axiosJWT";

export const getBills = createAsyncThunk(
  "bills/getBills",
  async ({ limit, q }) => {
    const response = await axiosJWT.get(`/bills?q=${q}&limit=${limit}`);

    return response.data;
  }
);

export const getBill = createAsyncThunk(
  "bills/getBill",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.get(`/bills/${id}`);

      return response.data;
    } catch (err) {
      console.clear();
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getInfoBill = createAsyncThunk(
  "bills/getInfoBill",
  async ({ id, limit, q }, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.get(
        `/bills/info/${id}?q=${q}&limit=${limit}`
      );

      return response.data;
    } catch (err) {
      console.clear();
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getUserBills = createAsyncThunk(
  "bills/getUserBills",
  async ({ uid, limit, q }, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.get(`/bills/user?q=${q}&limit=${limit}`);

      return response.data;
    } catch (err) {
      console.clear();
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const createBill = createAsyncThunk(
  "bills/createBill",
  async ({ createData, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.post(`/bills`, createData);
      navigate(-1);

      return response.data;
    } catch (err) {
      console.clear();
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updateBill = createAsyncThunk(
  "bills/updateBill",
  async ({ id, updateData, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.patch(`/bills/${id}`, updateData);
      navigate(-1);

      return response.data;
    } catch (err) {
      console.clear();
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const deleteBill = createAsyncThunk(
  "bills/deleteBill",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.delete(`/bills/${id}`);

      return response.data;
    } catch (err) {
      console.clear();
      return rejectWithValue(err.response.data.message);
    }
  }
);
