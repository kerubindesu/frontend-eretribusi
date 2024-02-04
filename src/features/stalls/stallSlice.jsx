import { createSlice } from "@reduxjs/toolkit";
import {
  getStalls,
  getFreeStalls,
  getStall,
  createStall,
  updateStall,
  deleteStall,
} from "./stallActions";

export const stallSlice = createSlice({
  name: "stalls",
  initialState: {
    isLoading: false,
    stalls: "",
    stall: "",
    isError: "",
  },
  extraReducers: {
    // GET All
    [getStalls.pending]: (state) => {
      state.isLoading = true;
    },
    [getStalls.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.stalls = payload;
      state.isError = "";
    },
    [getStalls.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
    // GET All Free Stalls
    [getFreeStalls.pending]: (state) => {
      state.isLoading = true;
    },
    [getFreeStalls.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.stalls = payload;
      state.isError = "";
    },
    [getFreeStalls.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
    // GET Single
    [getStall.pending]: (state) => {
      state.isLoading = true;
    },
    [getStall.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.stall = payload;
    },
    [getStall.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
    // POST
    [createStall.pending]: (state) => {
      state.isLoading = true;
    },
    [createStall.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [createStall.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
    // PATCH
    [updateStall.pending]: (state) => {
      state.isLoading = true;
    },
    [updateStall.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [updateStall.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
    // DELETE
    [deleteStall.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteStall.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [deleteStall.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
  },
});

export default stallSlice.reducer;
