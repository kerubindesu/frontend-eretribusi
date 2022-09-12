import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_URL = "http://localhost:4000/api/retributions";

export const getRetributions = createAsyncThunk(
  "retributions/getRetributions",
  async (arg, { getState }) => {
    const { auth } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.userToken.token}`,
      },
    };
    const response = await axios.get(`${base_URL}`, config);
    return response.data;
  }
);

export const getRetribution = createAsyncThunk(
  "retributions/getRetribution",
  async ({ id }, { getState }) => {
    const { auth } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.userToken.token}`,
      },
    };
    try {
      const response = await axios.get(`${base_URL}/${id}`, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const saveRetribution = createAsyncThunk(
  "retributions/saveRetribution",
  async (
    { stall_type, stall_name, stall_size, name, commerce_type, address },
    { rejectWithValue, getState }
  ) => {
    try {
      const { auth } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.userToken.token}`,
        },
      };
      const response = await axios.post(
        `${base_URL}`,
        {
          stall_type,
          stall_name,
          stall_size,
          commerce_type,
          name,
          address,
        },
        config
      );

      return response.data;
    } catch (error) {
      const message = error.response.data.error;
      return rejectWithValue(message);
    }
  }
);

export const updateRetribution = createAsyncThunk(
  "retributions/updateRetribution",
  async (
    { id, stall_type, stall_name, stall_size, commerce_type, name, address },
    { rejectWithValue, getState }
  ) => {
    try {
      const { auth } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.userToken.token}`,
        },
      };
      const response = await axios.patch(
        `${base_URL}/${id}`,
        {
          stall_type,
          stall_name,
          stall_size,
          commerce_type,
          name,
          address,
        },
        config
      );

      return response.data;
    } catch (error) {
      const message = error.response.data.error;
      return rejectWithValue(message);
    }
  }
);

export const deleteRetribution = createAsyncThunk(
  "retributions/deleteRetribution",
  async (id, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.userToken.token}`,
        },
      };
      await axios.delete(`${base_URL}/${id}`, config);
      return id;
    } catch (error) {
      const message = error.response.data.error;
      return rejectWithValue(message);
    }
  }
);
