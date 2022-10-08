import { createSlice } from "@reduxjs/toolkit";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "./userActions";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    users: "",
    user: "",
    isError: "",
  },
  extraReducers: {
    // GET users
    [getUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.success = true;
      state.users = payload;
    },
    [getUsers.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },

    // GET user
    [getUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.success = true;
      state.user = payload;
    },
    [getUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },

    // POST user
    [createUser.pending]: (state) => {
      state.isLoading = true;
    },
    [createUser.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [createUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },

    // PATCH user
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },

    // DELETE user
    [deleteUser.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteUser.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [deleteUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    },
  },
});

export default userSlice.reducer;
