import { isQuickViewOpen } from "@/store/slices/quickViewSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { ProductType } from "@/lib/definitions";
import ProductViewLayout from "./ProductViewLayout";

export const QuickView = ({
  quickViewProduct,
}: {
  quickViewProduct: ProductType | null;
}) => {
  const dispatch = useDispatch();
  const isQuickView = useSelector((state: RootState) => state.quickView);

  return (
    <div
      className={`${
        isQuickView
          ? "opacity-100 visible top-0"
          : "opacity-0 invisible -top-12"
      } fixed left-0 z-50 flex w-full ease-out duration-300 h-full overflow-x-hidden overflow-y-auto lg:items-center`}
    >
      <div className="relative h-full max-w-[1200px] flex items-center justify-center mx-auto product_modal z-50">
        <div className="relative h-screen max-h-[850px] py-6 px-10 mx-3 overflow-y-auto bg-white shadow-md modal-content">
          <div className="modal-wrapper">
            <button
              onClick={() => dispatch(isQuickViewOpen("closeQuickView"))}
              className="absolute block space-y-1 duration-200 ease-linear hover:text-[#B88E2F] cursor-pointer top-5 right-5 hover:rotate-90"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 512 512"
                className="text-2xl font-normal"
                height="1.5em"
                width="1.5em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z" />
              </svg>
            </button>
            {quickViewProduct && (
              <ProductViewLayout
                containerClass="flex flex-col lg:flex-row product-details"
                isQuickView={isQuickView}
                product={quickViewProduct}
              />
            )}
          </div>
        </div>
      </div>
      <div
        onClick={() => dispatch(isQuickViewOpen("closeQuickView"))}
        className={`${
          isQuickView ? "" : "hidden"
        } body-overlay visible opacity-70 bg-[#03041c] h-full w-full fixed top-0 z-40 left-0 ease-out duration-300`}
      ></div>
    </div>
  );
};
