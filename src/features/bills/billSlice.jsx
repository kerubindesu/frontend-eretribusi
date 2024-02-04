import { createSlice } from "@reduxjs/toolkit";
import {
  getBills,
  getBill,
  getInfoBill,
  getUserBills,
  createBill,
  updateBill,
  deleteBill,
} from "./billActions";

export const billSlice = createSlice({
  name: "bills",
  initialState: {
    isLoading: false,
    bills: "",
    bill: "",
    isError: "",
    info: "",
  },
  extraReducers: {
    // GET All
    [getBills.pending]: (state) => {
      state.isLoading = true;
    },
    [getBills.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.bills = payload;
      state.isError = "";
    },
    [getBills.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
    // GET Single
    [getBill.pending]: (state) => {
      state.isLoading = true;
    },
    [getBill.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.bill = payload;
    },
    [getBill.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
    // GET info
    [getInfoBill.pending]: (state) => {
      state.isLoading = true;
    },
    [getInfoBill.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.info = payload;
    },
    [getInfoBill.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
    // GET user bills
    [getUserBills.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserBills.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.bills = payload;
      state.isError = "";
    },
    [getUserBills.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
    // POST
    [createBill.pending]: (state) => {
      state.isLoading = true;
    },
    [createBill.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [createBill.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
    // PATCH
    [updateBill.pending]: (state) => {
      state.isLoading = true;
    },
    [updateBill.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [updateBill.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
    // DELETE
    [deleteBill.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteBill.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [deleteBill.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
  },
});

export default billSlice.reducer;
