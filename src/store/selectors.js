export const getIsLogged = state => state.auth.auth;

export const getJwt = state => state.auth.jwt;

export const getUi = state => state.ui;

export const areAdvertsLoaded = state => state.ads.areLoaded;

export const getUserInfo = state => state.user.userInfo;

export const getAdverts = state => (state.ads.data ? state.ads.data : []);

export const getNotification = state =>
  state.user.notifications ? state.user.notifications : [];

export const getFavoriteAds = state =>
  state.ads.favoriteAds ? state.ads.favoriteAds : [];

export const userAds = state => (state.user.ads ? state.user.ads : []);

export const adsByUser = state =>
  state.ads.adsByUser ? state.ads.adsByUser : [];

export const getAdsPerPage = state => state.ads.adsPerPage;

export const getAllCategory = state =>
  state.categories.data ? state.categories.data : [];

export const selectTotalCountAds = state => state.ads.totalCountAds;

export const getAdvertById = advertId => state =>
  state.ads.data.find(advert => advert._id === advertId);

export const areCategoriesLoaded = state => state.categories.areLoaded;

export const areFavoriteAds = state => state.ads.favoriteAreLoaded;

export const areUsersAdsLoaded = state => state.user.usersAdsAreLoaded;

export const isFavorite = id => state =>
  state.ads.favoriteAds.some(favAd => favAd._id === id);
