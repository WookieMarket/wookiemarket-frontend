import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const authUserInfo = createAsyncThunk(
  'user/authUserInfo',
  async (id, { extra: { service }, rejectWithValue }) => {
    try {
      const response = await service.user.getUserInfo(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const editUserInfo = createAsyncThunk(
  'user/editUserInfo',
  async (data, { extra: { service }, rejectWithValue }) => {
    try {
      const response = await service.user.editUserData(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const addFavorite = createAsyncThunk(
  'user/addFavorite',
  async (adId, { extra: { service }, rejectWithValue }) => {
    try {
      const favoriteAds = await service.user.includeFavoriteAds(adId);
      return favoriteAds;
    } catch (errorFavorites) {
      return rejectWithValue(errorFavorites);
    }
  },
);

export const deleteFavorites = createAsyncThunk(
  'user/deleteFavorites',
  async (adId, { extra: { service }, rejectWithValue }) => {
    try {
      const favoriteAds = await service.user.removeFavorite(adId);
      return favoriteAds;
    } catch (errorFavorites) {
      return rejectWithValue(errorFavorites);
    }
  },
);

const user = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
    //favorites: [],
  },
  extraReducers: builder => {
    builder
      .addCase(authUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload.results;
      })
      .addCase(editUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload.results;
      });
    // .addCase(addFavorite.fulfilled, (state, action) => {
    //   state.favorites.unshift = action.payload;
    // });
  },
});

export default user.reducer;
