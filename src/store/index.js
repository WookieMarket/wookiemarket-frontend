import { configureStore as rtkConfigureStore } from '@reduxjs/toolkit';
import * as service from '../service';
import * as adsService from '../service/ads';
import * as reducers from './reducers';
import {
  failureRedirects,
  successRedirects,
  localStorageAdverts,
} from './middleware';
import { authLogin } from './slices/auth';

export default function configureStore(preloadedState, { router }) {
  const extraMiddleware = [
    failureRedirects(router, { 401: "/login", 404: "/404" }),
    successRedirects(router, {
      [authLogin.fulfilled.type]: () => {
        return router.state.location.state?.from?.pathname || "/";
      },
    }),
    localStorageAdverts,
  ];

  const persistedState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };

  const store = rtkConfigureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: { extraArgument: { service, router } },
        serializableCheck: false,
      }).concat(extraMiddleware),
    preloadedState: persistedState(),
  });
  return store;
}
