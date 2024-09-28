import { IoClose } from "react-icons/io5";
import { MiniCartItem } from "./MiniCartItem";
import { useDispatch, useSelector } from "react-redux";
import { isMiniCartOpen } from "../../store/slices/MiniCartSlice";

export const MiniCart = () => {
  const dispatch = useDispatch();
  const MiniCartOpen = useSelector((state) => state.miniCart);
  return (
    <>
      <div
        className={`fixed right-0 top-0 h-full max-w-[300px] xsm:max-w-[350px] scrollbar-transition ${
          MiniCartOpen ? "" : "translate-x-full-plus-80"
        } scrollbar-bg z-50 overflow-y-scroll overscroll-contain scrollbar-none`}
      >
        <div className="relative flex flex-col justify-between min-h-full">
          <div className="top">
            <div className="relative">
              <div className="title p-5 border-b border-[#eaeaef] shadow-[0_0_10px_0_hsla(0,0%,51%,.2)]">
                <h4 className="font-medium uppercase">Shopping cart</h4>
              </div>
              <div className="absolute close top-5 right-5">
                <button
                  onClick={() => dispatch(isMiniCartOpen("closeMiniCart"))}
                  className="block space-y-1 duration-200 ease-linear cursor-pointer hover:rotate-90"
                >
                  {<IoClose className="text-2xl" />}
                </button>
              </div>
            </div>
            <div className="h-full items">
              <MiniCartItem
                name={"Hennington Queen Upholstered Bed"}
                image={
                  "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727286275/hennington-queen-bed-bisque1_jqwc8x.webp"
                }
                price={1099.99}
                quantity={1}
              />
              <MiniCartItem
                name={"Mahoney Sofa"}
                image={
                  "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727272688/mahoney-sofa-pebble1_zdk1x4.webp"
                }
                price={297}
                quantity={1}
              />
              <MiniCartItem
                name={"Rencott Dining Extension Table"}
                image={
                  "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727287111/rencott-dining-table-light-brown1_wqnj1w.webp"
                }
                price={799}
                quantity={1}
              />
              <MiniCartItem
                name={"Trentlore Queen Metal Bed"}
                image={
                  "https://res.cloudinary.com/dlfmu0nzl/image/upload/f_auto,q_auto/v1727289768/trentlore-metal-bed-white1_y9eh7n.webp"
                }
                price={297}
                quantity={1}
              />
            </div>
          </div>

          <div className="checkout p-[20px_20px_85px] bg-white border-t-2 border-[#eaeaef]">
            <div className="mb-7">
              <h4 className="inline-block text-lg font-medium">Subtotal:</h4>
              <span className="text-[#B88E2F] font-semibold text-xl float-right">
                $1200.99
              </span>
            </div>
            <div>
              <a
                href="/cart"
                className="capitalize p-[10px_30px] mb-4 text-[#03041c] text-[15px] inline-block w-full hover:bg-[#03041c] hover:text-white ease-linear duration-300 font-medium text-center bg-[#f1f1f1] relative z-10 "
              >
                view cart
              </a>
              <a
                href="/checkout"
                className="capitalize p-[10px_30px] text-[#03041c] text-[15px] inline-block w-full hover:bg-[#03041c] hover:text-white ease-linear duration-300 font-medium text-center border-[#eaeaef] border relative z-10 "
              >
                checkout
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          dispatch(isMiniCartOpen("closeMiniCart"));
        }}
        className={`body-overlay ${
          MiniCartOpen ? "visible opacity-70" : "opacity-0 invisible"
        } bg-[#03041c] h-full w-full fixed top-0 z-40 left-0 ease-out duration-300`}
      ></div>
    </>
  );
};
