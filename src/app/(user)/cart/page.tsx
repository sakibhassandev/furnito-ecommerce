import { Metadata } from "next";
import StoreProvider from "@/store/StoreProvider";
import CartPage from "@/ui/cart/CartPage";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Cart",
};

const Cart = () => {
  return (
    <StoreProvider>
      <SessionProvider>
        <CartPage />
      </SessionProvider>
    </StoreProvider>
  );
};

export default Cart;
