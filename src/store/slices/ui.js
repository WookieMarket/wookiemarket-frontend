import { createSlice } from '@reduxjs/toolkit';

const isActionError = action => action.error;
const isRequestAction = action => /\/pending$/.test(action.type);
const isSuccessAction = action => /\/fulfilled$/.test(action.type);

const ui = createSlice({
  name: 'ui',
  initialState: {
    isLoading: false,
    error: null,
  },
  //NOTE I create a case for reseterror
  reducers: {
    resetError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
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
  },
});

export const { resetError, toggleModal } = ui.actions;
export default ui.reducer;
