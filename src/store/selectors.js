export const areAdvertsLoaded = (state) => state.adverts.areLoaded;
export const getAdverts = (state) =>
    state.adverts.data ? state.adverts.data : [];
