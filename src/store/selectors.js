export const getIsLogged = (state) => state.auth;
export const getUi = (state) => state.ui;
export const areAdvertsLoaded = (state) => state.ads.areLoaded;
export const getAdverts = (state) => (state.ads.data ? state.ads.data : []);
export const getAdvertById = (state, advertId) =>
  state.ads.data.find((advert) => advert._id === advertId);

/* //Meomization: Ensure that only return a different reference when necessary.
export const getAdvertById = createSelector(
  (state) => state.ads.data,
  (_, advertId) => advertId,
  (data, advertId) => data.find((advert) => advert._id === advertId)
);*/
