import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { areAdvertsLoaded } from '../selectors';

export const adsCreate = createAsyncThunk(
  'ads/create',
  async (ad, { extra: { service }, rejectWithValue }) => {
    try {
      //TODO modificar cuando este implementado el detalle del anuncio
      //const { createAd } = await service.ads.createAd(ad);
      const createAd = await service.ads.createAd(ad);
      console.log('Ante', createAd);

      const createdAdId = createAd.result._id;

      //TODO modificar cuando este implementado el detalle del anuncio
      const fetchedAd = await service.ads.getAd(createdAdId);
      //return createdAd;
      return fetchedAd;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const advertsList = createAsyncThunk(
  'ads/list',
  async ({ skip, limit, sort }, { extra: { service }, rejectWithValue }) => {
    try {

      const adverts = await service.ads.getRecentAds(skip, limit);

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

export const setAdsPerPage = createAsyncThunk(
  'ads/setAdsPerPage',
  async (adsPerPage, { dispatch }) => {
    dispatch({ type: 'ads/setAdsPerPage', payload: adsPerPage });
  },
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
  },
);

export const uploadModifiedAd = createAsyncThunk(
  'ads/uploadModifiedAd',
  async ({ id, ad }, { extra: { service }, rejectWithValue }) => {
    try {
      //ad = await service.ads.getAd(id);
      const modifiedAd = await service.ads.modifyAd(id, ad);
      return modifiedAd;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteAdvert = createAsyncThunk(
  'ads/deleteAdvert',
  async (id, { extra: { service }, rejectWithValue }) => {
    try {
      await service.ads.deleteAdvert(id);
      console.log('Advert...delted');
      return true;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getAdsByUser = createAsyncThunk(
  'user/ads',
  async (username, { extra: { service }, rejectWithValue }) => {
    try {
      const response = await service.user.getUserAds(username);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const ads = createSlice({
  name: 'ads',
  initialState: {
    areLoaded: false,
    data: [],
    adsPerPage: 4,
    totalCountAds: 0,
  },
  reducers: {
    setAdsPerPage(state, action) {
      state.adsPerPage = action.payload;
    },
    userAds: [],
  },
  extraReducers: builder => {
    builder
      .addCase(adsCreate.fulfilled, (state, action) => {
        state.data.unshift(action.payload.result);
      })
      .addCase(advertsList.fulfilled, (state, action) => {
        state.areLoaded = true;
        state.data = action.payload.results;
        state.totalCountAds = action.payload.total;
      })
      .addCase(uploadModifiedAd.fulfilled, (state, action) => {
        //state.areLoaded = true;
        state.data.unshift(action.payload.result);
      })
      .addCase(getAdById.fulfilled, (state, action) => {
        state.areLoaded = false;
        state.data = [action.payload.result];
      })
      .addCase(getAdsByUser.fulfilled, (state, action) => {
        state.areLoaded = true;
        state.userAds = action.payload.results;
      });
  },
});

export default ads.reducer;
