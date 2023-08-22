import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { areCategoriesLoaded } from '../selectors';

export const categoriesList = createAsyncThunk(
  'ads/categoriesList',
  async (_, { extra: { service }, rejectWithValue }) => {
    console.log('Antes del try');
    try {
      console.log('Despachando la acción categoriesList');
      const categories = await service.ads.getCategories();
      console.log('Categorías obtenidas:', categories);
      return categories;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
  {
    condition: (_, { getState }) => !areCategoriesLoaded(getState()),
  }
);

const adsCategories = createSlice({
  name: 'adsCategories',
  initialState: {
    areCategoriesLoaded: false,
    categories: [],
  },
  extraReducers: (builder) => {
    builder.addCase(categoriesList.fulfilled, (state, action) => {
      state.areCategoriesLoaded = true;
      state.categories = action.payload.results;
    });
  },
});

export default adsCategories.reducer;