import { CommonCartSection } from "../common/CommonCartSection";
import { SectionCommonHeader } from "../common/SectionCommonHeader";
import { useSelector } from "react-redux";
import {
  increaseWishlistQuantity,
  decreaseWishlistQuantity,
  removeWishListItem,
} from "../../store/slices/wishListSlice";
import { InfoHighlights } from "../common/InfoHighlights";

export const WishList = () => {
  const wishListItems = useSelector((state) => state.wishList);

  return (
    <section>
      <SectionCommonHeader name="My Wishlist" prev="Home" curr="Wishlist" />
      <CommonCartSection
        productList={wishListItems}
        emptyCardName="wishlist"
        toastName="wishlist"
        increaseAction={increaseWishlistQuantity}
        decreaseAction={decreaseWishlistQuantity}
        removeAction={removeWishListItem}
      />
      <InfoHighlights />
    </section>
  );
};
