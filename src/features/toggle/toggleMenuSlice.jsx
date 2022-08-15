import { createSlice } from "@reduxjs/toolkit";

const toggleMenuSlice = createSlice({
  name: "toggle",
  initialState: {
    toggleStatus: false,
  },
  reducers: {
    updateToggle: (state, action) => {
      state.toggleStatus = action.payload;
    },
  },
});

export const { updateToggle } = toggleMenuSlice.actions;

export default toggleMenuSlice.reducer;
