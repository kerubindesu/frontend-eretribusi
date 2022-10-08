import { createSlice } from "@reduxjs/toolkit";
import {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
} from "./roleActions";

export const roleSlice = createSlice({
  name: "roles",
  initialState: {
    isLoading: false,
    roles: "",
    role: "",
    isError: "",
  },
  extraReducers: {
    // GET All
    [getRoles.pending]: (state) => {
      state.isLoading = true;
    },
    [getRoles.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.roles = payload;
      state.isError = "";
    },
    [getRoles.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
    // GET Single
    [getRole.pending]: (state) => {
      state.isLoading = true;
    },
    [getRole.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.role = payload;
    },
    [getRole.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
    // POST
    [createRole.pending]: (state) => {
      state.isLoading = true;
    },
    [createRole.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [createRole.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
    // PATCH
    [updateRole.pending]: (state) => {
      state.isLoading = true;
    },
    [updateRole.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [updateRole.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
    // DELETE
    [deleteRole.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteRole.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [deleteRole.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
  },
});

export default roleSlice.reducer;
