import { createReducer } from '@reduxjs/toolkit';
import { uiResetError } from './actions';

export const defaultState = {
    adverts: {
        areLoaded: false,
        data: [],
    },
    ui: {
        isLoading: false,
        error: null,
        dataFiltered: false,
    },
};

const isAdvertsLoadSuccess = (action) => action.type;

export const adverts = createReducer(defaultState.adverts, (builder) => {
    builder
    .addCase(isAdvertsLoadSuccess, (state, action) => {
        state.areLoaded = true;
        state.data = action.payload;
    });
});

const isActionError = (action) => action.error;
const isRequestAction = (action) => /\/pending$/.test(action.type);
const isSuccesAction = (action) => /\/fullfiled$/.test(action.type);

export const ui = createReducer(defaultState.ui, (builder) => {
    builder
        .addCase(uiResetError, (state) => {
            state.error = null;
        })
        .addMatcher(
            (isActionError, (action) => action.error),
            (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            }
        )
        .addMatcher(isRequestAction, (state, action) => {
            state.isLoading = true;
            state.error = null;
        })
        .addMatcher(isSuccesAction, (state, action) => {
            state.isLoading = false;
            state.error = null;
        });
});
