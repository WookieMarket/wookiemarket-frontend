import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { areCategoriesLoaded } from '../selectors';

export const categoriesList = createAsyncThunk(
  'categories/list',
  async (_, { extra: { service }, rejectWithValue }) => {
    try {
      const categories = await service.ads.getCategories();

      return categories;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
  {
    condition: (_, { getState }) => !areCategoriesLoaded(getState()),
  },
);

const categories = createSlice({
  name: 'categories',
  initialState: {
    areLoaded: false,
    data: [],
  },
  reducers: {
    addNewCategory: (state, action) => {
      const newCategory = action.payload;
      state.data.unshift(newCategory); // Agregar la nueva categoría al principio
    },
  },
  extraReducers: builder => {
    builder.addCase(categoriesList.fulfilled, (state, action) => {
      state.areLoaded = true;
      state.data = action.payload.results;
    });
  },
});

export const { addNewCategory } = categories.actions;
export default categories.reducer;
