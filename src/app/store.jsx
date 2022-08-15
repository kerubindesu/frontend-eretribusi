import { configureStore } from "@reduxjs/toolkit";
import retributionsReducer from "../features/retributions/retributionsSlice";
import accountsReducer from "../features/accounts/accountsSlice";
import modalReducer from "../features/modal/modalSlice";
import toggleMenuReducer from "../features/toggle/toggleMenuSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    toggleMenu: toggleMenuReducer,
    retributions: retributionsReducer,
    accounts: accountsReducer,
  },
});
