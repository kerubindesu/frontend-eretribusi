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

export const saveRetribution = createAsyncThunk(
  "retributions/saveRetribution",
  async ({ name, address }, { getState }) => {
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
        name,
        address,
      },
      config
    );
    return response.data;
  }
);

export const updateRetribution = createAsyncThunk(
  "retributions/updateRetribution",
  async ({ id, name, address }, { getState }) => {
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
        name,
        address,
      },
      config
    );
    return response.data;
  }
);

export const deleteRetribution = createAsyncThunk(
  "retributions/deleteRetribution",
  async (id, { getState }) => {
    const { auth } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.userToken.token}`,
      },
    };
    await axios.delete(`${base_URL}/${id}`, config);
    return id;
  }
);
