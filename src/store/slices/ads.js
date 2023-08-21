import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { areAdvertsLoaded } from '../selectors';
//import { getAd } from '../../service/ads';

export const adsCreate = createAsyncThunk(
  'ads/create',
  async (ad, { extra: { service }, rejectWithValue }) => {
    try {
      //TODO modificar cuando este implementado el detalle del anuncio
      //const { id } = await service.ads.createAd(ad);
      const id = await service.ads.createAd(ad);
      console.log('Ante', id);

      //TODO modificar cuando este implementado el detalle del anuncio
      //const createdAd = await service.ads.getAd(id);
      //return createdAd;
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const advertsList = createAsyncThunk(
  'ads/list',
  async (_, { extra: { service }, rejectWithValue }) => {
    console.log('Antes del try');
    try {
      //console.log('Despachando la acción advertsList');
      const adverts = await service.ads.getRecentAds();
      //console.log('Anuncios obtenidos:', adverts);
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

export const getAdById = createAsyncThunk(
  'ads/fetchAdvertById',
  async (id, { extra: { service }, rejectWithValue }) => {
    try {
      const advert = await service.ads.getAd(id);
      return advert;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const ads = createSlice({
  name: 'ads',
  initialState: {
    areLoaded: false,
    data: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(adsCreate.fulfilled, (state, action) => {
        state.data.unshift(action.payload.result);
      })
      .addCase(advertsList.fulfilled, (state, action) => {
        state.areLoaded = true;
        state.data = action.payload.results;
      })
      .addCase(getAdById.fulfilled, (state, action) => {
        state.areLoaded = false;
        state.data = [action.payload.result]
      });
  },
});

export default ads.reducer;
