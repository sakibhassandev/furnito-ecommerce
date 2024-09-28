import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "wishList",
  initialState: [],
  reducers: {
    addWishListItem(state, action) {
      state.push({ ...action.payload, quantity: 1 });
    },
    removeWishListItem(state, action) {},
  },
});

export default slice.reducer;
export const { addWishListItem, removeWishListItem } = slice.actions;
