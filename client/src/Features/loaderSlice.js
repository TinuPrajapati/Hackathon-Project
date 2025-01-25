import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
  name: "Loader",
  initialState: {
    value: false,
  },
  reducers: {
    loaderState: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loaderState } = loaderSlice.actions;

export default loaderSlice.reducer;
