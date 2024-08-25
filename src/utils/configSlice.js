import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    preferredLanguage: "en",
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.preferredLanguage = action.payload;
    },
  },
});

export const { changeLanguage } = configSlice.actions;

export default configSlice.reducer;
