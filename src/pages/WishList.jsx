import { CommonCartSection } from "../components/product/CommonCartSection";
import { SectionCommonHeader } from "../components/common/SectionCommonHeader";
import { useSelector } from "react-redux";
import {
  increaseWishlistQuantity,
  decreaseWishlistQuantity,
  removeWishListItem,
} from "../store/slices/wishListSlice";
import { InfoHighlights } from "../components/common/InfoHighlights";
import { Link } from "react-router-dom";

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
        bottomSec={
          <div
            className={`wishListsBtn pt-14 xl:max-w-[1140px] text-white lg:max-w-[960px] md:max-w-[720px] mx-auto ${
              wishListItems.length < 1 ? "hidden" : ""
            }`}
          >
            <Link
              className="p-[16px_40px_18px] rounded-sm hover:bg-[#ddad3d] ease-out duration-300 bg-[#03041c] text-sm"
              to="/cart"
            >
              Go to Cart
            </Link>
          </div>
        }
      />
      <InfoHighlights />
    </section>
  );
};
