export const getIsLogged = (state) => state.auth;
export const getUi = (state) => state.ui;
export const areAdvertsLoaded = (state) => state.adverts.areLoaded;
export const getAdverts = (state) => (state.ads.data ? state.ads.data : []);
