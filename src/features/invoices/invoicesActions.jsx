import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../app/API";

export const getInvoices = createAsyncThunk(
  "invoices/getInvoices",
  async ({ limit, q }) => {
    const response = await API.get(`/invoices?q=${q}&limit=${limit}`);
    return response.data;
  }
);

export const getInvoiceById = createAsyncThunk(
  "invoices/getInvoiceById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/invoices/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const chargeInvoice = createAsyncThunk(
  "invoices/createRetribution",
  async ({ createData, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/invoices/charge`, createData);
      navigate(-1);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
