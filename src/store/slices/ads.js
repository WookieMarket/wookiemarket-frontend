import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  areAdvertsLoaded,
  areFavoriteAds,
  areUsersAdsLoaded,
} from '../selectors';

export const adsCreate = createAsyncThunk(
  'ads/create',
  async (ad, { extra: { service }, rejectWithValue }) => {
    try {
      //TODO modificar cuando este implementado el detalle del anuncio
      //const { createAd } = await service.ads.createAd(ad);
      const createAd = await service.ads.createAd(ad);
      //console.log('Ante', createAd);

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
  async (_, { extra: { service }, rejectWithValue }) => {
    //console.log('Antes del try');
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
      //console.log('Advert...delted');
      return true;
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

const ads = createSlice({
  name: 'ads',
  initialState: {
    areLoaded: false,
    favoriteAreLoaded: false,
    usersAdsAreLoaded: false,
    data: [],
    userAds: [],
    favoriteAds: [],
  },

  extraReducers: builder => {
    builder
      .addCase(adsCreate.fulfilled, (state, action) => {
        state.data.unshift(action.payload.result);
      })
      .addCase(advertsList.fulfilled, (state, action) => {
        state.areLoaded = true;
        state.data = action.payload.results;
      })
      // .addCase(advertsList.fulfilled, (state, action) => {
      //   state.areLoaded = true;
      //   state.data = action.payload.results.map(ad => ({
      //     ...ad,
      //     isFavorite: state.favoriteAds.some(favAd => favAd._id === ad._id),
      //   }));
      // })
      .addCase(uploadModifiedAd.fulfilled, (state, action) => {
        //state.areLoaded = true;
        state.data.unshift(action.payload.result);
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
        console.log('creado', newFavoriteAd);
        state.favoriteAds.unshift(newFavoriteAd);
      })
      .addCase(deleteFavorites.fulfilled, (state, action) => {
        const adIdToRemove = action.payload;
        console.log('borrado', adIdToRemove);

        state.favoriteAds = state.favoriteAds.filter(
          ad => ad._id !== adIdToRemove,
        );
      });
  },
});

export const { updateIsFavorite } = ads.actions;
export default ads.reducer;
