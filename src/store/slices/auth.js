import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// use rejectWithValue to take care of the error

export const authSignup = createAsyncThunk(
  'auth/signup',
  async (userData, { extra: { service }, rejectWithValue }) => {
    try {
      await service.auth.signup(userData);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const authLogin = createAsyncThunk(
  'auth/login',
  async (credentials, { extra: { service }, rejectWithValue }) => {
    try {
      const response = await service.auth.login(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const authLogout = createAsyncThunk(
  'auth/logout',
  (_, { extra: { service } }) => service.auth.logout(),
);

export const emailResetPassword = createAsyncThunk(
  'auth/emailResetPassword',
  async (email, { extra: { service }, rejectWithValue }) => {
    try {
      const resetEmail = await service.auth.emailPassword(email);
      return resetEmail;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (
    { email, newPassword, token },
    { extra: { service }, rejectWithValue },
  ) => {
    try {
      const response = await service.auth.resetPassword(
        email,
        newPassword,
        token,
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteAccount = createAsyncThunk(
  'auth/deleteAccount',
  async (email, { extra: { service }, rejectWithValue }) => {
    try {
      const response = await service.auth.deleteUser(email);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const auth = createSlice({
  name: 'auth',
  initialState: {
    auth: false,
    jwt: '',
  },
  extraReducers: builder => {
    builder
      .addCase(authSignup.fulfilled, (state, action) => {
        state.auth = true;
        state.jwt = '';
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.auth = true;
        state.jwt = action.payload;
      })
      .addCase(authLogout.fulfilled, (state, action) => {
        state.auth = false;
        state.jwt = '';
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.auth = false;
        state.jwt = '';
      });
  },
});

export default auth.reducer;
