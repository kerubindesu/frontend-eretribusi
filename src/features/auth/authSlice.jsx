import { createSlice } from "@reduxjs/toolkit";
import { logIn, refresh, logOut } from "./authActions";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isLoading: false,
    isError: "",
    refreshError: "",
  },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.token = payload;
    },
    logOut: (state, action) => {
      state.token = null;
    },
  },
  extraReducers: {
    [logIn.pending]: (state) => {
      state.isLoading = true;
    },
    [logIn.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.token = payload;
      state.isError = "";
      state.refreshError = "";
    },
    [logIn.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },

    [refresh.pending]: (state) => {
      state.isLoading = true;
    },
    [refresh.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.token = payload;
      state.refreshError = "";
    },
    [refresh.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.refreshError = payload;
    },

    [logOut.pending]: (state) => {
      state.isLoading = true;
    },
    [logOut.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.token = null;
    },
    [logOut.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
