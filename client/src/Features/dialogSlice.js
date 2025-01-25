import { createSlice } from "@reduxjs/toolkit";

export const dialogSlice = createSlice({
  name: "Dialog",
  initialState: {
    value: false,
  },
  reducers: {
    dialogState: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { dialogState } = dialogSlice.actions;

export default dialogSlice.reducer;
