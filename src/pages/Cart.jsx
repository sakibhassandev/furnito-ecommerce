import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { SectionCommonHeader } from "../components/common/SectionCommonHeader";
import { CommonCartSection } from "../components/product/CommonCartSection";
import {
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
  removeCartItem,
} from "../store/slices/cartSlice";
import { InfoHighlights } from "../components/common/InfoHighlights";

export const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const totalPrice = cartItems.reduce((acc, curr) => {
    return (
      acc +
      (curr.discountPrice ? curr.discountPrice : curr.price) * curr.quantity
    );
  }, 0);
  return (
    <>
      <SectionCommonHeader prev={"Home"} curr={"Cart"} name={"My Cart"} />
      <CommonCartSection
        productList={cartItems}
        emptyCardName="cart"
        toastName="cart"
        increaseAction={increaseCartItemQuantity}
        decreaseAction={decreaseCartItemQuantity}
        removeAction={removeCartItem}
        bottomSec={
          <div className="xl:max-w-[1140px] lg:max-w-[960px] md:max-w-[720px] mx-auto md:flex justify-end">
            <div className="ml-auto mt-14 md:w-5/12">
              <h2 className="text-2xl mb-5 capitalize text-[#03041c] font-semibold">
                Cart totals
              </h2>
              <ul className="border border-[#eaeaef] mb-8">
                <li className="text-[15px] text-[#03041c] p-[10px_20px] border-b border-[#eaeaef]">
                  Subtotal{" "}
                  <span className="float-right text-[#525258]">
                    ${totalPrice}
                  </span>
                </li>
                <li className="text-[15px] text-[#03041c] p-[10px_20px] border-b border-[#eaeaef]">
                  Total{" "}
                  <span className="float-right text-[#525258]">
                    ${totalPrice}
                  </span>
                </li>
              </ul>
              <Link
                to="/checkout"
                className="p-[16px_40px_18px] rounded-sm hover:bg-[#ddad3d] text-white ease-out duration-300 bg-[#03041c] text-sm"
              >
                Proceed to checkout
              </Link>
            </div>
          </div>
        }
      />
      <InfoHighlights />
    </>
  );
};
