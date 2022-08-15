import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const userAuth = JSON.parse(localStorage.getItem("userAuth"))
  ? JSON.parse(localStorage.getItem("userAuth"))
  : null;

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        "http://localhost:4000/api/user/login",
        {
          email,
          password,
        },
        config
      );
      localStorage.setItem("userAuth", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.error;
        return rejectWithValue(message);
      }
    }
  }
);

export const userRegister = createAsyncThunk(
  "users/userRegister",
  async ({ email, role, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        "http://localhost:4000/api/user/register",
        {
          email,
          role,
          password,
        },
        config
      );
      localStorage.setItem("userAuth", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.error;
        return rejectWithValue(message);
      }
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    userAuth,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userAuth");
      state.loading = false;
      state.userAuth = null;
      state.error = null;
    },
    getUserInfo: (state, { payload }) => {
      state.loading = false;
      state.userAuth = payload;
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
      state.userAuth = payload.userAuth;
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
      state.userAuth = payload.userAuth;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { logout, getUserInfo } = authSlice.actions;

export default authSlice.reducer;
