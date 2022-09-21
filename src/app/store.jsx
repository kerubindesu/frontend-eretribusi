import { configureStore } from "@reduxjs/toolkit";
import invoicesReducer from "../features/invoices/invoicesSlice";
import retributionsReducer from "../features/retributions/retributionsSlice";
import stallsReducer from "../features/stalls/stallsSlice";
import accountsReducer from "../features/accounts/accountsSlice";
import modalReducer from "../features/modal/modalSlice";
import toggleMenuReducer from "../features/toggle/toggleMenuSlice";
import authReducer from "../features/auth/authSlice";
import businessTypesReducer from "../features/businessTypes/businessTypesSlice";
import rolesReducer from "../features/roles/rolesSlice";

export const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
    retributions: retributionsReducer,
    businessTypes: businessTypesReducer,
    stalls: stallsReducer,
    auth: authReducer,
    modal: modalReducer,
    roles: rolesReducer,
    toggleMenu: toggleMenuReducer,
    accounts: accountsReducer,
  },
});
