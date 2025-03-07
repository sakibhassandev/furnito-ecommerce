import { Metadata } from "next";
import WishListPage from "@/ui/wishlist/WishListPage";
import StoreProvider from "@/store/StoreProvider";

export const metadata: Metadata = {
  title: "Wishlist",
};

const WishList = () => {
  return (
    <StoreProvider>
      <WishListPage />
    </StoreProvider>
  );
};

export default WishList;
