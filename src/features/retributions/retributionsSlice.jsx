import { createSlice } from "@reduxjs/toolkit";
import {
  getRetributions,
  getRetribution,
  updateRetribution,
  saveRetribution,
  deleteRetribution,
} from "./retributionsActions";

export const retributionsSlice = createSlice({
  name: "retributions",
  initialState: {
    loading: false,
    success: false,
    retributions: [],
    error: null,
  },
  extraReducers: {
    // GET All
    [getRetributions.pending]: (state) => {
      state.loading = true;
    },
    [getRetributions.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.retributions = payload;
    },
    [getRetributions.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // GET Single
    [getRetribution.pending]: (state) => {
      state.loading = true;
    },
    [getRetribution.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.retributions = payload;
    },
    [getRetribution.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // POST
    [saveRetribution.pending]: (state) => {
      state.loading = true;
    },
    [saveRetribution.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.retributions = payload;
    },
    [saveRetribution.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // PATCH
    [updateRetribution.pending]: (state) => {
      state.loading = true;
    },
    [updateRetribution.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.retributions = payload;
    },
    [updateRetribution.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // DELTE
    [deleteRetribution.pending]: (state) => {
      state.loading = true;
    },
    [deleteRetribution.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.retributions = payload;
    },
    [deleteRetribution.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default retributionsSlice.reducer;
