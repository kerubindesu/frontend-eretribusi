import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const apiURL = "http://localhost:3001/v1";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const response = await axios.get(`${apiURL}/users`);
  return response.data;
});

export const saveUser = createAsyncThunk(
  "users/saveUser",
  async ({ name, email, gender }) => {
    const response = await axios.post(`${apiURL}/user/`, {
      name,
      email,
      gender,
    });
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, name, email, gender }) => {
    const response = await axios.patch(`${apiURL}/user/${id}`, {
      name,
      email,
      gender,
    });
    return response.data;
  }
);

export const deleteUser = createAsyncThunk("users/deleteUsers", async (id) => {
  await axios.delete(`${apiURL}/user/${id}`);
  return id;
});

const userEntity = createEntityAdapter({
  selectId: (users) => users._id,
});

const usersSlice = createSlice({
  name: "users",
  initialState: userEntity.getInitialState({
    isLoading: true,
    isError: null,
  }),
  extraReducers: {
    // GET
    [getUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      userEntity.setAll(state, action.payload);
    },
    [getUsers.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
    // POST
    [saveUser.pending]: (state) => {
      state.isLoading = true;
    },
    [saveUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      userEntity.addOne(state, action.payload);
    },
    [saveUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
    // PATCH
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      userEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    },
    [updateUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
    // DELTE
    [deleteUser.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      userEntity.removeOne(state, action.payload);
    },
    [deleteUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export const usersSelector = userEntity.getSelectors((state) => state.users);
export default usersSlice.reducer;
