import { configureStore as rtkConfigureStore } from '@reduxjs/toolkit';
import * as service from '../service';
import * as reducers from './reducers';
import { failureRedirects, successRedirects } from './middleware';
import { authSignup, authLogin } from './slices/auth';
import { adsCreate, uploadModifiedAd } from './slices/ads';

export default function configureStore(preloadedState, { router }) {
  const extraMiddleware = [
    failureRedirects(router, { 401: '/login', 404: '/404' }),
    successRedirects(router, {
      [authSignup.fulfilled.type]: () => {
        return router.state.location.state?.from?.pathname || '/';
      },
      [authLogin.fulfilled.type]: () => {
        return router.state.location.state?.from?.pathname || '/';
      },
      [adsCreate.fulfilled.type]: action => {
        console.log('redirec id', action.payload.result._id);
        return `/adverts/${action.payload.result._id}/${action.payload.result.name}`;
      },
      [uploadModifiedAd.fulfilled.type]: action => {
        return `/adverts/${action.payload.result._id}/${action.payload.result.name}`;
      },
    }),
  ];

  const store = rtkConfigureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: { extraArgument: { service, router } },
        serializableCheck: false,
      }).concat(extraMiddleware),
    preloadedState,
  });
  return store;
}
