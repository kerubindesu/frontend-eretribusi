import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const api = "http://localhost:4000/api/accounts";

export const getAccounts = createAsyncThunk(
  "accounts/getAccounts",
  async () => {
    const response = await axios.get(`${api}`);
    return response.data;
  }
);

export const saveAccount = createAsyncThunk(
  "accounts/saveAccount",
  async ({ name, address }) => {
    const response = await axios.post(`${api}`, {
      name,
      address,
    });
    return response.data;
  }
);

export const updateAccount = createAsyncThunk(
  "accounts/updateAccount",
  async ({ id, name, address }) => {
    const response = await axios.patch(`${api}/${id}`, {
      name,
      address,
    });
    return response.data;
  }
);

export const deleteAccount = createAsyncThunk(
  "accounts/deleteAccount",
  async (id) => {
    await axios.delete(`${api}/${id}`);
    return id;
  }
);

const accountsEntity = createEntityAdapter({
  selectId: (accounts) => accounts._id,
});

const accountsSlice = createSlice({
  name: "accounts",
  initialState: accountsEntity.getInitialState({
    isLoading: true,
    isError: null,
  }),
  extraReducers: {
    // GET
    [getAccounts.pending]: (state) => {
      state.isLoading = true;
    },
    [getAccounts.fulfilled]: (state, action) => {
      state.isLoading = false;
      accountsEntity.setAll(state, action.payload);
    },
    [getAccounts.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
    // POST
    [saveAccount.pending]: (state) => {
      state.isLoading = true;
    },
    [saveAccount.fulfilled]: (state, action) => {
      state.isLoading = false;
      accountsEntity.addOne(state, action.payload);
    },
    [saveAccount.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
    // PATCH
    [updateAccount.pending]: (state) => {
      state.isLoading = true;
    },
    [updateAccount.fulfilled]: (state, action) => {
      state.isLoading = false;
      accountsEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    },
    [updateAccount.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
    // DELTE
    [deleteAccount.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteAccount.fulfilled]: (state, action) => {
      state.isLoading = false;
      accountsEntity.removeOne(state, action.payload);
    },
    [deleteAccount.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export const accountsSelector = accountsEntity.getSelectors(
  (state) => state.accounts
);
export default accountsSlice.reducer;
