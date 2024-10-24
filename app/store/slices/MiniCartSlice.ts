import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "miniCart",
  initialState: "",
  reducers: {
    isMiniCartOpen(state, action) {
      if (action.payload === "openMiniCart") {
        return true;
      } else if (action.payload === "closeMiniCart") {
        return false;
      }
    },
  },
});

export default slice.reducer;
export const { isMiniCartOpen } = slice.actions;
