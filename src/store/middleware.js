export const failureRedirects =
  (router, redirectsMap) => () => next => action => {
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
  (router, redirectsMap) => () => next => action => {
    const result = next(action);

    const redirect = redirectsMap[action.type];
    if (redirect) {
      router.navigate(redirect(action));
    }

    if (action.type === 'auth/logout/fulfilled') {
      router.navigate('/');
    }

    // Redirects to "Home" page after account successfully created
    if (action.type === 'auth/signup/fulfilled') {
      router.navigate('/login');
    }

    // TODO modificar cuando este implementado el detalle del anuncio
    // if (action.type === 'ads/create/fulfilled') {
    //   router.navigate('/home');
    // }

    // Redirects to "Home" page after successful password change
    if (action.type === 'auth/resetPassword/fulfilled') {
      router.navigate('/login');
    }

    return result;
  };
