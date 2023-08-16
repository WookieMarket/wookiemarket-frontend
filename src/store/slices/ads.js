import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { areAdvertsLoaded } from "../selectors";

export const advertsList = createAsyncThunk(
  'adverts/list',
  async (_, { extra: { adsService }, rejectWithValue }) => {
    try {
      const adverts = await adsService.getLastAdv();
      return adverts;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
  {
    condition: (_, { getState }) => !areAdvertsLoaded(getState()),
  },
);

const ads = createSlice({
  name: "adverts",
  initialState: {
    areLoaded: false,
    data: [],
  },
  extraReducers: builder => {
    builder.addCase(advertsList.fulfilled, (state, action) => {
      state.areLoaded = true;
      state.data = action.payload.results;
    });
  },
});

export default ads.reducer;
