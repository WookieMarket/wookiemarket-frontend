export const failureRedirects =
  (router, redirectsMap) => () => (next) => (action) => {
    const result = next(action);

    if (action.error && action.payload) {
      const redirect = redirectsMap[action.payload.status];
      if (redirect) {
        router.navigate(redirect);
      }
    }
    return result;
  };

export const successRedirects =
  (router, redirectsMap) => () => (next) => (action) => {
    const result = next(action);

    const redirect = redirectsMap[action.type];
    if (redirect) {
      router.navigate(redirect(action));
    }

    return result;
  };

  export const localStorageAdverts = (store) => (next) => (action) => {
    const result = next(action);
    localStorage.setItem('state', JSON.stringify(store.getState()));
    return result;
  };
  