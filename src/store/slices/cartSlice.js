import { createSlice, current } from "@reduxjs/toolkit";

const findItemIndex = (state, action) =>
  state.findIndex((item) => item.id === action.payload.id);

const slice = createSlice({
  name: "cart",
  initialState: JSON.parse(localStorage.getItem("cartItems"))
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  reducers: {
    addCartItem(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      if (existingItemIndex !== -1) {
        state[existingItemIndex].quantity += action.payload.quantity || 1;
      } else {
        state.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(current(state)));
    },
    removeCartItem(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      state.splice(existingItemIndex, 1);
      localStorage.setItem("cartItems", JSON.stringify(current(state)));
    },
    increaseCartItemQuantity(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      if (existingItemIndex !== -1) {
        state[existingItemIndex].quantity += 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(current(state)));
    },
    decreaseCartItemQuantity(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      if (existingItemIndex !== -1) {
        state[existingItemIndex].quantity -= 1;
      }
      if (state[existingItemIndex].quantity === 0) {
        state.splice(existingItemIndex, 1);
      }
      localStorage.setItem("cartItems", JSON.stringify(current(state)));
    },
  },
});

export default slice.reducer;
export const {
  addCartItem,
  removeCartItem,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
} = slice.actions;
