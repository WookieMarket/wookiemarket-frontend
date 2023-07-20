import { createAction } from "@reduxjs/toolkit";

import { AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT } from "./types";

export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});

export const authLoginSuccess = () => ({
  type: AUTH_LOGIN_SUCCESS,
});

export const authLoginFailure = createAction("auth/loginFailure", error => ({
  error: true,
  payload: error,
}));

export const authLogin =
  credentials =>
  async (dispatch, _getState, { service, router }) => {
    dispatch(authLoginRequest());
    try {
      await service.auth.login(credentials);
      // Logged in
      dispatch(authLoginSuccess());
      // Redirect to pathname
      const to = router.state.location.state?.from?.pathname || "/";
      router.navigate(to);
    } catch (error) {
      dispatch(authLoginFailure(error));
    }
  };

export const authLogoutSuccess = () => ({
  type: AUTH_LOGOUT,
});

export const authLogout =
  () =>
  async (dispatch, _getState, { service }) => {
    await service.auth.logout();
    dispatch(authLogoutSuccess());
  };
