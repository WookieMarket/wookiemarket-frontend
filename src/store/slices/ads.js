import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { areAdvertsLoaded } from '../selectors';

export const advertsList = createAsyncThunk(
  'adverts/list',
  async (_, { extra: { service }, rejectWithValue }) => {
    console.log('Antes del try');
    try {
      console.log('Despachando la acción advertsList');
      const adverts = await service.getLastAdv();
      console.log('Anuncios obtenidos:', adverts);
      return adverts;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
  {
    condition: (_, { getState }) => !areAdvertsLoaded(getState()),
  }
);

const ads = createSlice({
  name: 'adverts',
  initialState: {
    areLoaded: false,
    data: [],
  },
  extraReducers: (builder) => {
    builder.addCase(advertsList.fulfilled, (state, action) => {
      state.adverts.areLoaded = true;
      state.adverts.data = action.payload;
    });
  },
});

export default ads.reducer;
