import { configureStore } from "@reduxjs/toolkit";
import toggleMenuReducer from "../features/toggle/toggleMenuSlice";
import retributionsReducer from "../features/retributions/retributionsSlice";
import modalReducer from "../features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    toggleMenu: toggleMenuReducer,
    retributions: retributionsReducer,
  },
});
