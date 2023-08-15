import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const adsCreate = createAsyncThunk(
  "ads/create",
  async (ad, { extra: { service }, rejectWithValue }) => {
    try {
      const { id } = await service.ads.createAd(ad);

      //TODO modificar cuando este implementado el detalle del anuncio
      //const createdAd = await service.ads.getAd(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const ads = createSlice({
  name: "adverts",
  initialState: {
    areLoaded: false,
    data: [],
  },
  extraReducers: builder => {
    builder.addCase(adsCreate.fulfilled, (state, action) => {
      state.data.unshift(action.payload);
    });
  },
});

export default ads.reducer;
