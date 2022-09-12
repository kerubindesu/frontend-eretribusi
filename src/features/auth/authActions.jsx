import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_URL = "http://localhost:4000/api/users";

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `${base_URL}/login`,
        {
          username,
          password,
        },
        config
      );
      localStorage.setItem("userToken", JSON.stringify(response.data));
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
  "user/userRegister",
  async ({ name, username, role, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `${base_URL}/register`,
        {
          name,
          username,
          role,
          password,
        },
        config
      );
      localStorage.setItem("userToken", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      const message = error.response.data.error;
      return rejectWithValue(message);
    }
  }
);

export const getUserAuth = createAsyncThunk(
  "user/getUserAuth",
  async (arg, { getState }) => {
    const { auth } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${auth.userToken.token}`,
      },
    };
    const response = await axios.get(`${base_URL}/auth`, config);
    return response.data;
  }
);
