import { createSlice } from "@reduxjs/toolkit";
import {
  getBusinessTypes,
  getBusinessTypeById,
  createBusinessType,
  updateBusinessType,
  deleteBusinessType,
} from "./businessTypesActions";

export const businessTypesSlice = createSlice({
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
    [getBusinessTypeById.pending]: (state) => {
      state.isLoading = true;
    },
    [getBusinessTypeById.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.businessType = payload;
    },
    [getBusinessTypeById.rejected]: (state, { payload }) => {
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

export default businessTypesSlice.reducer;
