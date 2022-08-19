import { createSlice } from "@reduxjs/toolkit";
import { userRegister, userLogin, getUserAuth } from "./authActions";

const userToken = JSON.parse(localStorage.getItem("userToken"))
  ? JSON.parse(localStorage.getItem("userToken"))
  : null;

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    userToken,
    userAuth: null,
    success: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken");
      state.loading = false;
      state.userAuth = null;
      state.error = null;
    },
  },
  extraReducers: {
    // userRegister
    [userRegister.pending]: (state) => {
      state.loading = true;
    },
    [userRegister.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userAuth = payload;
      state.userToken = payload.userToken;
      state.success = true;
    },
    [userRegister.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // userLogin
    [userLogin.pending]: (state) => {
      state.loading = true;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userAuth = payload;
      state.userToken = payload.userToken;
      state.success = true;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // getUserAuth
    [getUserAuth.pending]: (state) => {
      state.loading = true;
    },
    [getUserAuth.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userAuth = payload;
    },
    [getUserAuth.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { logout } = authSlice.actions;

export const selectCurrentToken = (state) => state.auth.userToken;

export default authSlice.reducer;
