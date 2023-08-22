export const getIsLogged = state => state.auth;
export const areAdvertsLoaded = state => state.ads.areLoaded;
export const getAdverts = state => (state.ads.data ? state.ads.data : []);
export const getAdsPerPage = state => state.ads.adsPerPage;


export const getUi = state => state.ui;