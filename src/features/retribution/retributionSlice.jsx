import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const apiURL = "http://localhost:3001/v1/";

export const getRetributions = createAsyncThunk(
  "retributions/getRetributions",
  async () => {
    const response = await axios.get(
      `${apiURL}/retributions?page=1&perPage=20`
    );
    const responseApi = response.data;
    return responseApi.data;
  }
);

export const saveRetribution = createAsyncThunk(
  "retributions/saveRetribution",
  async ({ nama, alamat }) => {
    const response = await axios.post(
      `${apiURL}/retribution/${(nama, alamat)}`
    );
    const responseApi = response.data;
    return responseApi.data;
  }
);

const retributionEntity = createEntityAdapter({
  selectId: (retribution) => retribution._id,
});

const retributionSlice = createSlice({
  name: "retribution",
  initialState: retributionEntity.getInitialState(),
  extraReducers: {
    [getRetributions.fulfilled]: (state, action) => {
      retributionEntity.setAll(state, action.payload);
    },
    [saveRetribution.fulfilled]: (state, action) => {
      retributionEntity.addOne(state, action.payload);
    },
  },
});

export const retributionSelector = retributionEntity.getSelectors(
  (state) => state.retribution
);
export default retributionSlice.reducer;
