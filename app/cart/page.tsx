import { Metadata } from "next";
import StoreProvider from "../store/slices/StoreProvider";
import CartPage from "../ui/cart/CartPage";

export const metadata: Metadata = {
  title: "Cart",
};

const Cart = () => {
  return (
    <StoreProvider>
      <CartPage />
    </StoreProvider>
  );
};

export default Cart;
