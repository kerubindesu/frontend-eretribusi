import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosJWT from "../../app/axiosJWT";

export const getInvoices = createAsyncThunk(
  "invoices/getInvoices",
  async ({ limit, q }) => {
    const response = await axiosJWT.get(`/invoices?q=${q}&limit=${limit}`);

    return response.data;
  }
);

export const getUserInvoices = createAsyncThunk(
  "invoices/getUserInvoices",
  async ({ limit, q }) => {
    const response = await axiosJWT.get(`/invoices/user?q=${q}&limit=${limit}`);

    return response.data;
  }
);

export const getInvoice = createAsyncThunk(
  "invoices/getInvoice",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.get(`/invoices/${id}`);

      return response.data;
    } catch (err) {
      console.clear();
      return rejectWithValue(err.response.status);
    }
  }
);

export const chargeInvoice = createAsyncThunk(
  "invoices/chargeInvoice",
  async ({ charge, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.post(`/invoices/charge`, charge);
      navigate(`/invoices/${response.data._id}`);

      return response.data;
    } catch (err) {
      // console.clear();
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getIncome = createAsyncThunk(
  "invoices/getIncome",
  async ({ startDate, endDate }) => {
    const response = await axiosJWT.get(
      `/invoices/income?startDate=${startDate}&endDate=${endDate}`
    );

    return response.data;
  }
);
