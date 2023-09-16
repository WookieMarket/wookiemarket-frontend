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

export const readNotifications = createAsyncThunk(
  'user/readNotifications',
  async (notificationId, { extra: { service }, rejectWithValue }) => {
    try {
      const notification = await service.user.isRead(notificationId);
      console.log('notificaciones', notification);
      console.log('true', notification.result);
      return notification.result;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const user = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
    notifications: [],
  },
  extraReducers: builder => {
    builder
      .addCase(authUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload.results;
      })
      .addCase(editUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload.results;
      })
      .addCase(readNotifications.fulfilled, (state, action) => {
        const modifiedNotifications = action.payload;

        state.notifications = state.notifications.filter(
          notification => notification._id !== modifiedNotifications._id,
        );
        console.log('payload', action.payload);
        state.notifications.unshift(modifiedNotifications);
      })
      .addCase(userNotification.fulfilled, (state, action) => {
        state.notifications = action.payload;
      });
  },
});

export default user.reducer;
