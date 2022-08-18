import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import {
  getRetributions,
  updateRetribution,
  saveRetribution,
  deleteRetribution,
} from "./retributionsActions";

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
