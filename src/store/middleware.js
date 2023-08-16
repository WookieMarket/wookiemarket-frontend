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

    if (action.type === "auth/logout/fulfilled") {
      router.navigate("/");
    }

    //NOTE Add redirect to "Home" page after successful password change
    if (action.type === "auth/resetPassword/fulfilled") {
      router.navigate("/login");
    }

    return result;
  };
