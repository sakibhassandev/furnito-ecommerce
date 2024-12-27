import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/store/slices/productSlice";
import cartReducer from "@/store/slices/cartSlice";
import wishListReducer from "@/store/slices/wishListSlice";
import miniCartReducer from "@/store/slices/miniCartSlice";
import quickViewReducer from "@/store/slices/quickViewSlice";
import isLoggedInReducer from "@/store/slices/isLoggedIn";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cartItems: cartReducer,
    wishList: wishListReducer,
    miniCart: miniCartReducer,
    quickView: quickViewReducer,
    isLoggedIn: isLoggedInReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
