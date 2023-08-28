import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { areTagsLoaded } from '../selectors';

export const categoryList = createAsyncThunk(
  'category/list',
  async (_, { extra: { service }, rejectWithValue }) => {
    try {
      const tag = await service.ads.getTags();

      return tag;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
  {
    condition: (_, { getState }) => !areTagsLoaded(getState()),
  },
);

const category = createSlice({
  name: 'category',
  initialState: {
    areLoaded: false,
    data: [],
  },
  extraReducers: builder => {
    builder.addCase(categoryList.fulfilled, (state, action) => {
      state.areLoaded = true;
      state.data = action.payload.results;
    });
  },
});

export default category.reducer;
