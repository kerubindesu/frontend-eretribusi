import { createSlice } from "@reduxjs/toolkit";
import {
  getInvoices,
  getUserInvoices,
  getInvoice,
  chargeInvoice,
} from "./invoiceActions";

export const invoiceSlice = createSlice({
  name: "invoices",
  initialState: {
    isLoading: false,
    invoices: "",
    invoice: "",
    isError: "",
    chargeLoading: false,
  },
  extraReducers: {
    // GET All
    [getInvoices.pending]: (state) => {
      state.isLoading = true;
    },
    [getInvoices.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.invoices = payload;
      state.isError = "";
    },
    [getInvoices.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
    // GET user invoices
    [getUserInvoices.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserInvoices.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.invoices = payload;
      state.isError = "";
    },
    [getUserInvoices.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
    // GET Single
    [getInvoice.pending]: (state) => {
      state.isLoading = true;
    },
    [getInvoice.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.invoice = payload;
    },
    [getInvoice.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
    // POST
    [chargeInvoice.pending]: (state) => {
      state.chargeLoading = true;
    },
    [chargeInvoice.fulfilled]: (state, { payload }) => {
      state.chargeLoading = false;
      state.invoice = payload;
    },
    [chargeInvoice.rejected]: (state, { payload }) => {
      state.chargeLoading = false;
      state.isError = payload;
    },
  },
});

export default invoiceSlice.reducer;
