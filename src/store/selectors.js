export const getIsLogged = state => state.auth.auth;

export const getJwt = state => state.auth.jwt;

export const getUi = state => state.ui;

export const areAdvertsLoaded = state => state.ads.areLoaded;

export const getUserInfo = state => state.user.userInfo;

export const getAdverts = state => (state.ads.data ? state.ads.data : []);

export const getFavoriteAds = state =>
  state.ads.favoriteAds ? state.ads.favoriteAds : [];

export const getUserAds = state => (state.ads.userAds ? state.ads.userAds : []);

export const getAllCategory = state =>
  state.categories.data ? state.categories.data : [];

export const getAdvertById = advertId => state =>
  state.ads.data.find(advert => advert._id === advertId);

export const areCategoriesLoaded = state => state.categories.areLoaded;

export const areFavoriteAds = state => state.ads.favoriteAreLoaded;

export const areUsersAdsLoaded = state => state.ads.usersAdsAreLoaded;
