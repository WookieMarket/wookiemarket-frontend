import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { areAdvertsLoaded } from "../selectors";

export const advertsList = createAsyncThunk(
    'adverts/list',
    async (_, { extra: { service }, rejectWithValue }) => {
        
        try {
            const response =  await service.getLastAdv();
            const adverts = response.results; 
            console.log('Esto es Adverts en slice/adverts:' + adverts)
            return adverts;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
    {
        condition:(_, { getState }) => !areAdvertsLoaded(getState(),)
    },
);

const adverts = createSlice({
    name: 'adverts',
    initialState: {
        adverts: {
            areLoaded: false,
            data: [],
        },
    },
    extraReducers: builder => { 
        builder
        .addCase(advertsList.fulfilled, (state, action) => {
            state.areLoaded = true;
            state.data = action.payload;
        });
    }
});

export default adverts.reducer;