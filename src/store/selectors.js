export const getIsLogged = (state) => state.auth;
export const getUi = (state) => state.ui;
export const areAdvertsLoaded = (state) => state.ads.areLoaded;
export const getAdverts = (state) => (state.ads.data ? state.ads.data : []);
export const getAdvertById = (state, advertId) =>
  state.ads.data.find((advert) => advert.id === advertId);
