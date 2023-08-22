export const getIsLogged = (state) => state.auth;
export const areAdvertsLoaded = (state) => state.ads.areLoaded;
export const getAdverts = (state) => (state.ads.data ? state.ads.data : []);
export const getAdsPerPage = (state) => state.ads.adsPerPage;
export const getCategoriesList = (state) =>
  state.ads.categories ? state.ads.categories : [];

export const getUi = (state) => state.ui;
