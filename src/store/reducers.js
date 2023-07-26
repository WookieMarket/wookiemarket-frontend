import { createReducer } from "@reduxjs/toolkit";
import { authLogin, authLogout, uiResetError } from "./actions";

//import { authLogin, authLogout, uiResetError } from './actions';

export const defaultState = {
  auth: false,
  ui: {
    isLoading: false,
    error: null,
  },
};

export const auth = createReducer(defaultState.auth, builder => {
  builder
    .addCase(authLogin.fulfilled, () => true)
    .addCase(authLogout.fulfilled, () => false);
});

const isActionError = action => action.error;
const isRequestAction = action => /\/pending$/.test(action.type);
const isSuccessAction = action => /\/fulfilled$/.test(action.type);

export const ui = createReducer(defaultState.ui, builder => {
  builder
    .addCase(uiResetError, state => {
      state.error = null;
    })
    .addMatcher(isActionError, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addMatcher(isRequestAction, (state, action) => {
      state.isLoading = true;
      state.error = null;
    })
    .addMatcher(isSuccessAction, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
});
