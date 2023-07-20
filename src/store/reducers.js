import { createReducer } from "@reduxjs/toolkit";
import { AUTH_LOGIN_SUCCESS, AUTH_LOGOUT } from "./types";

export const defaultState = {
  auth: false,
  ui: {
    isLoading: false,
    error: null,
  },
};

export const auth = createReducer(defaultState.auth, builder => {
  builder
    .addCase(AUTH_LOGIN_SUCCESS, () => true)
    .addCase(AUTH_LOGOUT, () => false);
});
