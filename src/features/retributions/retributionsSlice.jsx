import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:4000/api/retributions";

export const getRetributions = createAsyncThunk(
  "retributions/getRetributions",
  async (arg, { getState }) => {
    const { auth } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.userAuth.token}`,
      },
    };
    const response = await axios.get(`${baseURL}`, config);
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
        Authorization: `Bearer ${auth.userAuth.token}`,
      },
    };
    const response = await axios.post(
      `${baseURL}`,
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
        Authorization: `Bearer ${auth.userAuth.token}`,
      },
    };
    const response = await axios.patch(
      `${baseURL}/${id}`,
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
        Authorization: `Bearer ${auth.userAuth.token}`,
      },
    };
    await axios.delete(`${baseURL}/${id}`, config);
    return id;
  }
);

const retributionsEntity = createEntityAdapter({
  selectId: (retributions) => retributions._id,
});

const retributionsSlice = createSlice({
  name: "retributions",
  initialState: retributionsEntity.getInitialState({
    isLoading: true,
    isError: null,
  }),
  extraReducers: {
    // GET
    [getRetributions.pending]: (state) => {
      state.isLoading = true;
    },
    [getRetributions.fulfilled]: (state, action) => {
      state.isLoading = false;
      retributionsEntity.setAll(state, action.payload);
    },
    [getRetributions.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
    // POST
    [saveRetribution.pending]: (state) => {
      state.isLoading = true;
    },
    [saveRetribution.fulfilled]: (state, action) => {
      state.isLoading = false;
      retributionsEntity.addOne(state, action.payload);
    },
    [saveRetribution.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
    // PATCH
    [updateRetribution.pending]: (state) => {
      state.isLoading = true;
    },
    [updateRetribution.fulfilled]: (state, action) => {
      state.isLoading = false;
      retributionsEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    },
    [updateRetribution.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
    // DELTE
    [deleteRetribution.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteRetribution.fulfilled]: (state, action) => {
      state.isLoading = false;
      retributionsEntity.removeOne(state, action.payload);
    },
    [deleteRetribution.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export const retributionsSelector = retributionsEntity.getSelectors(
  (state) => state.retributions
);
export default retributionsSlice.reducer;
