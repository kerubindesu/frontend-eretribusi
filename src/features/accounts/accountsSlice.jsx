import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const api = "http://localhost:4000/api/users";

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
    loading: true,
    isError: null,
  }),
  extraReducers: {
    // GET
    [getAccounts.pending]: (state) => {
      state.loading = true;
    },
    [getAccounts.fulfilled]: (state, action) => {
      state.loading = false;
      accountsEntity.setAll(state, action.payload);
    },
    [getAccounts.rejected]: (state, action) => {
      state.loading = false;
      state.isError = action.error;
    },
    // POST
    [saveAccount.pending]: (state) => {
      state.loading = true;
    },
    [saveAccount.fulfilled]: (state, action) => {
      state.loading = false;
      accountsEntity.addOne(state, action.payload);
    },
    [saveAccount.rejected]: (state, action) => {
      state.loading = false;
      state.isError = action.error;
    },
    // PATCH
    [updateAccount.pending]: (state) => {
      state.loading = true;
    },
    [updateAccount.fulfilled]: (state, action) => {
      state.loading = false;
      accountsEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    },
    [updateAccount.rejected]: (state, action) => {
      state.loading = false;
      state.isError = action.error;
    },
    // DELTE
    [deleteAccount.pending]: (state) => {
      state.loading = true;
    },
    [deleteAccount.fulfilled]: (state, action) => {
      state.loading = false;
      accountsEntity.removeOne(state, action.payload);
    },
    [deleteAccount.rejected]: (state, action) => {
      state.loading = false;
      state.isError = action.error;
    },
  },
});

export const accountsSelector = accountsEntity.getSelectors(
  (state) => state.accounts
);
export default accountsSlice.reducer;
