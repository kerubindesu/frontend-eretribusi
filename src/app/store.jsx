import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import billReducer from "../features/bills/billSlice";
import businessTypeReducer from "../features/businessTypes/businessTypeSlice";
import invoiceReducer from "../features/invoices/invoiceSlice";
import modalReducer from "../features/modal/modalSlice";
import retributionReducer from "../features/retributions/retributionSlice";
import roleReducer from "../features/roles/roleSlice";
import stallReducer from "../features/stalls/stallSlice";
import toggleMenuReducer from "../features/toggle/toggleMenuSlice";
import userReducer from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bills: billReducer,
    businessTypes: businessTypeReducer,
    invoices: invoiceReducer,
    modal: modalReducer,
    retributions: retributionReducer,
    roles: roleReducer,
    stalls: stallReducer,
    toggleMenu: toggleMenuReducer,
    users: userReducer,
  },
});
