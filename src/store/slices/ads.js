import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { areAdvertsLoaded } from "../selectors";

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

export const advertsList = createAsyncThunk(
  "adverts/list",
  async (_, { extra: { service }, rejectWithValue }) => {
    console.log("Antes del try");
    try {
      console.log("Despachando la acción advertsList");
      const adverts = await service.ads.getLastAdv();
      console.log("Anuncios obtenidos:", adverts);
      return adverts;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
  {
    condition: (_, { getState }) => !areAdvertsLoaded(getState()),
  },
);

const ads = createSlice({
  name: "adverts",
  initialState: {
    areLoaded: false,
    data: [],
  },
  extraReducers: builder => {
    builder
      .addCase(adsCreate.fulfilled, (state, action) => {
        state.data.unshift(action.payload);
      })
      .addCase(advertsList.fulfilled, (state, action) => {
        state.areLoaded = true;
        state.data = action.payload.results;
      });
  },
});

export default ads.reducer;
