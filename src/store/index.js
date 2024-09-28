import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import wishListReducer from "./slices/wishListSlice";
import miniCartReducer from "./slices/MiniCartSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cartItems: cartReducer,
    wishList: wishListReducer,
    miniCart: miniCartReducer,
  },
});
