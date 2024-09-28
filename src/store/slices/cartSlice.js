import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addCartItem(state, action) {
      state.push({ ...action.payload, quantity: 1 });
    },
    removeCartItem(state, action) {},
    increaseCartItemQuantity(state, action) {},
    decreaseCartItemQuantity(state, action) {},
  },
});

export default slice.reducer;
export const {
  addCartItem,
  removeCartItem,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
} = slice.actions;
