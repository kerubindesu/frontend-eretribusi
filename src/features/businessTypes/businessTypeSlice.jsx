import { createSlice } from "@reduxjs/toolkit";
import {
  getBusinessTypes,
  getBusinessType,
  createBusinessType,
  updateBusinessType,
  deleteBusinessType,
} from "./businessTypeActions";

export const businessTypeSlice = createSlice({
  name: "businessTypes",
  initialState: {
    isLoading: false,
    businessTypes: "",
    businessType: "",
    isError: "",
  },
  extraReducers: {
    // GET All
    [getBusinessTypes.pending]: (state) => {
      state.isLoading = true;
    },
    [getBusinessTypes.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.businessTypes = payload;
      state.isError = "";
    },
    [getBusinessTypes.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
    // GET Single
    [getBusinessType.pending]: (state) => {
      state.isLoading = true;
    },
    [getBusinessType.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.businessType = payload;
    },
    [getBusinessType.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
    // POST
    [createBusinessType.pending]: (state) => {
      state.isLoading = true;
    },
    [createBusinessType.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [createBusinessType.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
    // PATCH
    [updateBusinessType.pending]: (state) => {
      state.isLoading = true;
    },
    [updateBusinessType.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [updateBusinessType.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
    // DELETE
    [deleteBusinessType.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteBusinessType.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [deleteBusinessType.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
  },
});

export default businessTypeSlice.reducer;
