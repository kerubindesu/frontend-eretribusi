import { configureStore } from "@reduxjs/toolkit";
import toggleMenuReducer from "../features/toggle/toggleMenuSlice";
import retributionReducer from "../features/retribution/retributionSlice";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    toggleMenu: toggleMenuReducer,
    retribution: retributionReducer,
    users: usersReducer,
  },
});
