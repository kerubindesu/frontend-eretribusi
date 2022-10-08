import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const logIn = createAsyncThunk(
  "auth/logIn",
  async ({ username, password, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth", { username, password });
      navigate("/");

      return response.data.accessToken;
    } catch (err) {
      console.clear();
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const refresh = createAsyncThunk(
  "auth/refresh",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get("/auth/refresh");
      return response.data.accessToken;
    } catch (err) {
      console.clear();
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logOut",
  async (navigate, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/logout");
      await navigate("/auth");

      return response.data;
    } catch (err) {
      console.clear();
      return rejectWithValue(err.response.data.message);
    }
  }
);
