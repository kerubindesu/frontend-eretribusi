import { createSlice } from "@reduxjs/toolkit";
import {
  getStalls,
  getStallById,
  createStall,
  updateStall,
  deleteStall,
} from "./stallsActions";

export const stallsSlice = createSlice({
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
    // GET Single
    [getStallById.pending]: (state) => {
      state.isLoading = true;
    },
    [getStallById.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.stall = payload;
    },
    [getStallById.rejected]: (state, { payload }) => {
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

export default stallsSlice.reducer;
