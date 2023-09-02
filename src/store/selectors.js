export const getIsLogged = state => state.auth.auth;
export const getJwt = state => state.auth.jwt;
export const getUi = state => state.ui;
export const areAdvertsLoaded = state => state.ads.areLoaded;
export const getUserInfo = state => state.user.userInfo;
export const getAdverts = state => (state.ads.data ? state.ads.data : []);
