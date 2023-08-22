export const getIsLogged = (state) => state.auth;
export const areAdvertsLoaded = (state) => state.ads.areLoaded;
export const getAdverts = (state) => (state.ads.data ? state.ads.data : []);
export const getAdsPerPage = (state) => state.ads.adsPerPage;
export const areCategoriesLoaded = (state) => state.adsCategories.areLoaded;
export const getCategoriesList = (state) =>
  state.adsCategories.categories ? state.adsCategories.categories : [];

export const getUi = (state) => state.ui;
