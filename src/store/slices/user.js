import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const authUserInfo = createAsyncThunk(
  'user/authUserInfo',
  async (id, { extra: { service }, rejectWithValue }) => {
    try {
      const response = await service.user.getUserInfo(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const editUserInfo = createAsyncThunk(
  'user/editUserInfo',
  async (data, { extra: { service }, rejectWithValue }) => {
    try {
      const response = await service.user.editUserData(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const userNotification = createAsyncThunk(
  'user/notification',
  async (_, { extra: { service }, rejectWithValue }) => {
    try {
      const userNotification = await service.user.notification();
      console.log('notificaciones', userNotification);
      return userNotification;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const user = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
    notification: [],
  },
  extraReducers: builder => {
    builder
      .addCase(authUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload.results;
      })
      .addCase(editUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload.results;
      })
      .addCase(userNotification.fulfilled, (state, action) => {
        state.notification = action.payload;
      });
  },
});

export default user.reducer;
