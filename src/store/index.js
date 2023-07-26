import { configureStore as rtkConfigureStore } from "@reduxjs/toolkit";

import * as service from "../service";
import * as reducers from "./reducers";
import * as actionCreators from "./actions";

const failureRedirects = (router, redirectsMap) => () => next => action => {
  const result = next(action);

  if (action.error) {
    const redirect = redirectsMap[action.payload.status];
    if (redirect) {
      router.navigate(redirect);
    }
  }
  return result;
};

const successRedirects = router => () => next => action => {
  const result = next(action);

  if (action.type === actionCreators.authLogin.fulfilled.type) {
    const to = router.state.location.state?.from?.pathname || "/";
    router.navigate(to);
  }

  return result;
};

export default function configureStore(preloadedState, { router }) {
  const extraMiddleware = [
    failureRedirects(router, { 401: "/login", 404: "/404" }),
    successRedirects(router),
  ];

  const store = rtkConfigureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: { extraArgument: { service, router } },
        serializableCheck: false,
      }).concat(extraMiddleware),
    preloadedState,
    devTools: {
      actionCreators,
    },
  });
  return store;
}
