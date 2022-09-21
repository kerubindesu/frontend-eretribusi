import { createSlice } from "@reduxjs/toolkit";
import { getInvoices, getInvoiceById, chargeInvoice } from "./invoicesActions";

export const invoicesSlice = createSlice({
  name: "invoices",
  initialState: {
    isLoading: false,
    invoices: "",
    invoice: "",
    isError: "",
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
    // GET Single
    [getInvoiceById.pending]: (state) => {
      state.isLoading = true;
    },
    [getInvoiceById.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.invoice = payload;
    },
    [getInvoiceById.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
    // POST
    [chargeInvoice.pending]: (state) => {
      state.isLoading = true;
    },
    [chargeInvoice.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [chargeInvoice.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
  },
});

export default invoicesSlice.reducer;
