import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

//NOTE I use rejectWithValue to take care of the error

export const authLogin = createAsyncThunk(
  "auth/login",
  async (credentials, { extra: { service, router }, rejectWithValue }) => {
    try {
      await service.auth.login(credentials);
      const to = router.state.location.state?.from?.pathname || "/";
      router.navigate(to);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const authLogout = createAsyncThunk(
  "auth/logout",
  (_, { extra: { service } }) => service.auth.logout(),
);

export const uiResetError = createAction("ui/resetError");
