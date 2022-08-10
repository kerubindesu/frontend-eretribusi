import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const api = "http://localhost:4000/api/retributions";

export const getRetributions = createAsyncThunk(
  "retributions/getRetributions",
  async () => {
    const response = await axios.get(`${api}`);
    return response.data;
  }
);

export const saveRetribution = createAsyncThunk(
  "retributions/saveRetribution",
  async ({ name, address }) => {
    const response = await axios.post(`${api}`, {
      name,
      address,
    });
    return response.data;
  }
);

export const updateRetribution = createAsyncThunk(
  "retributions/updateRetribution",
  async ({ id, name, address }) => {
    const response = await axios.patch(`${api}/${id}`, {
      name,
      address,
    });
    return response.data;
  }
);

export const deleteRetribution = createAsyncThunk(
  "retributions/deleteRetribution",
  async (id) => {
    await axios.delete(`${api}/${id}`);
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
