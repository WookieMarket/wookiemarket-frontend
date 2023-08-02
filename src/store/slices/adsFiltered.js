import { createSlice } from "@reduxjs/toolkit";

const dataFiltered = createSlice({
  name: "dataFiltered",
  initialState: [],
  reducers: {
    filterByName: (_, action) => {
      const { name, adverts } = action.payload;
      return adverts.filter(advert =>
        advert.name.toUpperCase().startsWith(name.toLocaleUpperCase()),
      );
    },
  },
});

export const { filterByName } = dataFiltered.actions;
export default dataFiltered.reducer;
