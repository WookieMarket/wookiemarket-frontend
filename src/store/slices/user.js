import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const authUserInfo = createAsyncThunk(
  'userInfo/authUserInfo',
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
  'userInfo/editUserInfo',
  async (data, { extra: { service }, rejectWithValue }) => {
    try {
      const response = await service.user.editUserData(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const user = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
  },
  extraReducers: builder => {
    builder
      .addCase(authUserInfo.fulfilled, (state, action) => ({
        userInfo: action.payload.results,
      }))
      .addCase(editUserInfo.fulfilled, (state, action) => ({
        userInfo: action.payload.results,
      }));
  },
});

export default user.reducer;
