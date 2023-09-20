import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import storage from '../../utils/storage';
import {
  areAdvertsLoaded,
  areFavoriteAds,
  areUsersAdsLoaded,
} from '../selectors';

export const adsCreate = createAsyncThunk(
  'ads/create',
  async (ad, { extra: { service }, rejectWithValue }) => {
    try {
      const createAd = await service.ads.createAd(ad);
      const createdAdId = createAd.result._id;

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
      const adverts = await service.ads.getRecentAds(skip, limit, sort);

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
    storage.set('adsPerPage', adsPerPage);
    dispatch({ type: 'ads/setAdsPerPage', payload: adsPerPage });
    return adsPerPage;
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
      const deleted = await service.ads.deleteAdvert(id);

      return deleted.adDeleted;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getAdsByUser = createAsyncThunk(
  'ads/getAdsByUser',
  async (username, { extra: { service }, rejectWithValue }) => {
    try {
      const response = await service.user.getUserAds(username);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
  {
    condition: (_, { getState }) => !areUsersAdsLoaded(getState()),
  },
);

export const getFavorite = createAsyncThunk(
  'ads/getFavorite',
  async (_, { extra: { service }, rejectWithValue }) => {
    try {
      const favoriteAds = await service.user.getFavoriteAds();
      return favoriteAds;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
  {
    condition: (_, { getState }) => !areFavoriteAds(getState()),
  },
);

export const addFavorite = createAsyncThunk(
  'ads/addFavorite',
  async (adId, { extra: { service }, rejectWithValue }) => {
    try {
      const favoriteAds = await service.user.includeFavoriteAds(adId);
      console.log('Ad added to favorites:', favoriteAds);
      return favoriteAds.addedAd;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteFavorites = createAsyncThunk(
  'ads/deleteFavorites',
  async (adId, { extra: { service }, rejectWithValue }) => {
    try {
      await service.user.removeFavorite(adId);
      console.log('Ad removed from favorites:', adId);
      return adId;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const emailBuyAd = createAsyncThunk(
  'ads/emailBuy',
  async (
    { adOwnerId, custom_message },
    { extra: { service }, rejectWithValue },
  ) => {
    try {
      await service.user.emailBuy(adOwnerId, custom_message);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getAdsWithFilters = createAsyncThunk(
  'ads/getAdsWithFilters',
  async filters => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const response = await fetch(
      `${apiUrl}/api/ads/adverts/filter?${new URLSearchParams(filters)}`,
    );
    const data = await response.json();
    return data;
  },
);

const ads = createSlice({
  name: 'ads',
  initialState: {
    areLoaded: false,
    favoriteAreLoaded: false,
    usersAdsAreLoaded: false,
    data: [],
    userAds: [],
    favoriteAds: [],
    adsPerPage:
      4 ||
      parseInt(storage.get('adsPerPage') || process.env.REACT_APP_ADS_PER_PAGE),
    totalCountAds: 0,
  },
  reducers: {
    setAdsPerPage(state, action) {
      state.adsPerPage = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(adsCreate.fulfilled, (state, action) => {
        state.data.unshift(action.payload.result);
        state.userAds.unshift(action.payload.result);
      })
      .addCase(setAdsPerPage.fulfilled, (state, action) => {
        state.adsPerPage = action.payload;
      })
      .addCase(advertsList.fulfilled, (state, action) => {
        state.areLoaded = true;
        state.data = action.payload.results;
        state.totalCountAds = action.payload.total;
      })
      .addCase(uploadModifiedAd.fulfilled, (state, action) => {
        // Delete old status ad
        const modifiedAd = action.payload.result;

        state.data = state.data.filter(ad => ad._id !== modifiedAd._id);
        state.userAds = state.userAds.filter(ad => ad._id !== modifiedAd._id);

        state.data.unshift(modifiedAd);
        state.userAds.unshift(modifiedAd);
      })
      .addCase(getAdById.fulfilled, (state, action) => {
        state.areLoaded = false;
        state.data = [action.payload.result];
      })
      .addCase(getAdsByUser.fulfilled, (state, action) => {
        state.usersAdsAreLoaded = true;
        state.userAds = action.payload.results;
      })
      .addCase(getFavorite.fulfilled, (state, action) => {
        state.favoriteAreLoaded = true;
        state.favoriteAds = action.payload;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        const newFavoriteAd = action.payload;
        state.favoriteAds.unshift(newFavoriteAd);
      })
      .addCase(deleteFavorites.fulfilled, (state, action) => {
        const adIdToRemove = action.payload;

        state.favoriteAds = state.favoriteAds.filter(
          ad => ad._id !== adIdToRemove,
        );
      })
      .addCase(deleteAdvert.fulfilled, (state, action) => {
        const adToRemove = action.payload;
        state.data = state.data.filter(ad => ad._id !== adToRemove);
        state.userAds = state.userAds.filter(ad => ad._id !== adToRemove);
      })
      .addCase(getAdsWithFilters.fulfilled, (state, action) => {
        state.areLoaded = true;
        state.data = action.payload.results;
        state.totalCountAds = action.payload.total;
      });
  },
});

export const { updateIsFavorite } = ads.actions;
export default ads.reducer;
