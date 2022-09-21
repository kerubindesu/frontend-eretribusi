import { createSlice } from "@reduxjs/toolkit";
import {
  getRetributions,
  getRetributionById,
  updateRetribution,
  createRetribution,
  deleteRetribution,
} from "./retributionsActions";

export const retributionsSlice = createSlice({
  name: "retributions",
  initialState: {
    isLoading: false,
    retributions: "",
    retribution: "",
    isError: "",
  },
  extraReducers: {
    // GET All
    [getRetributions.pending]: (state) => {
      state.isLoading = true;
    },
    [getRetributions.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.retributions = payload;
      state.isError = "";
    },
    [getRetributions.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
    // GET Single
    [getRetributionById.pending]: (state) => {
      state.isLoading = true;
    },
    [getRetributionById.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.retribution = payload;
    },
    [getRetributionById.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
    // POST
    [createRetribution.pending]: (state) => {
      state.isLoading = true;
    },
    [createRetribution.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [createRetribution.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
    // PATCH
    [updateRetribution.pending]: (state) => {
      state.isLoading = true;
    },
    [updateRetribution.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [updateRetribution.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
    // DELTE
    [deleteRetribution.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteRetribution.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [deleteRetribution.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
  },
});

export default retributionsSlice.reducer;
