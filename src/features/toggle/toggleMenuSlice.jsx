import { createSlice } from "@reduxjs/toolkit";

const toggleMenuSlice = createSlice({
  name: "toggle",
  initialState: {
    toggleStatus: false,
  },
  reducers: {
    update: (state, action) => {
      state.toggleStatus = action.payload;
    },
  },
});

export const { update } = toggleMenuSlice.actions;

export default toggleMenuSlice.reducer;
