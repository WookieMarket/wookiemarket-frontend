import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//NOTE I use rejectWithValue to take care of the error

export const authLogin = createAsyncThunk(
  "auth/login",
  async (credentials, { extra: { service }, rejectWithValue }) =>
    service.auth.login(credentials).catch(rejectWithValue),
);

export const authLogout = createAsyncThunk(
  "auth/logout",
  (_, { extra: { service } }) => service.auth.logout(),
);

const auth = createSlice({
  name: "auth",
  initialState: false,
  extraReducers: builder => {
    builder
      .addCase(authLogin.fulfilled, () => true)
      .addCase(authLogout.fulfilled, () => false);
  },
});

export default auth.reducer;
