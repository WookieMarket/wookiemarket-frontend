import { configureStore as rtkconfigureStore } from '@reduxjs/toolkit';

import * as reducers from './reducers';
import * as service from '../service';

import { failureRedirects, successRedirects } from './middleware';
import { authLogin } from './slices/auth';

export default function configureStore(preloadedState, { router }) {
  const extraMiddleware = [
    failureRedirects(router, { 401: '/login', 404: '/404' }),
    successRedirects(router, {
      [authLogin.fulfilled.type]: () => {
        return router.state.location.state?.from?.pathname || '/';
      },
    }),
  ];

  const store = rtkconfigureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: { extraArgument: { service, router } },
        serializableCheck: false,
      }).concat(extraMiddleware),
    preloadedState,
  });
  return store;
}
