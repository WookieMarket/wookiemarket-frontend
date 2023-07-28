import { createSlice } from "@reduxjs/toolkit";

const isActionError = (action) => action.error;
const isRequestAction = (action) => /\/pending$/.test(action.type);
const isSuccesAction = (action) => /\/fulfilled$/.test(action.type);

const ui =createSlice({
    name: 'ui',
    initialState: {
        isLoading: false,
        error: null,
        dataFiltered: false,
    },
    reducers: {
        resetError: state => {state.error = null},
    },
    extraReducers:  builder => {
        builder
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
    }  
});

export const { resetError } = ui.actions;
export default ui.reducer;
