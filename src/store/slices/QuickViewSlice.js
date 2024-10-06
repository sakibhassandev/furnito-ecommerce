import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "quickView",
  initialState: "",
  reducers: {
    isQuickViewOpen(state, action) {
      if (action.payload === "openQuickView") {
        return true;
      } else if (action.payload === "closeQuickView") {
        return false;
      }
    },
  },
});

export default slice.reducer;
export const { isQuickViewOpen } = slice.actions;
