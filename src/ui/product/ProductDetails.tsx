import { ProductType } from "@/lib/definitions";
import ProductDetailSkeleton from "../skeleton/ProductDetailSkeleton";
import ProductViewLayout from "./ProductViewLayout";

const ProductDetails = ({
  singleProduct,
}: {
  singleProduct: ProductType | null;
}) => {
  return (
    <>
      {singleProduct?.id ? (
        <div
          className={`flex w-full ease-out duration-300 mb-10 lg:items-center`}
        >
          <div className="max-w-[1300px] mx-auto">
            <div className="min-h-screen max-xsm:pt-5 xsm:p-10 flex items-center mx-3 bg-white">
              <div className="modal-wrapper">
                <ProductViewLayout
                  containerClass="flex flex-col gap-10 lg:flex-row product-details border-b border-[#dadce0] pb-4"
                  product={singleProduct}
                />
                <div className="description border-b border-[#dadce0] pb-4">
                  <h4 className="xsm:text-lg font-semibold text-[#03041c] my-5">
                    Description
                  </h4>
                  <h3 className="xsm:text-3xl font-semibold text-[#03041c] my-4">
                    {singleProduct?.name}
                  </h3>
                  <p className="max-xsm:text-sm text-[#525258]">
                    {singleProduct?.description}
                  </p>
                </div>
                <div className="reviews">
                  <h4 className="text-lg xsm:text-xl font-semibold text-[#03041c] my-5">
                    Reviews
                  </h4>
                  <div className="reviews-container flex flex-col gap-5">
                    {singleProduct?.reviews?.map((review, i) => {
                      return (
                        <div
                          className="review border-b border-[#dadce0] pb-4"
                          key={i}
                        >
                          <div className="review__header">
                            <div className="review__header__left">
                              <h4 className="mb-1 font-semibold max-xsm:text-sm text-[#03041c]">
                                {review.name}
                              </h4>
                              <div className="mb-1 flex max-xsm:text-sm items-start gap-2">
                                {Array.from({ length: 5 }, (_, index) => (
                                  <span
                                    key={index}
                                    className={
                                      index < review.rating
                                        ? "text-[#B88E2F]"
                                        : "text-[#dadce0]"
                                    }
                                  >
                                    ★
                                  </span>
                                ))}
                                <span className="mb-1 max-xsm:text-sm text-[#525258]">
                                  {review.rating}
                                </span>
                              </div>
                            </div>
                            <div className="mb-1 review__header__right">
                              <span className="max-xsm:text-sm text-[#525258]">
                                {review.updatedAt?.split("T")[0]}
                              </span>
                            </div>
                          </div>
                          <div className="review__content">
                            <p className="xsm:text-sm text-[#525258]">
                              {review.message}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ProductDetailSkeleton />
      )}
    </>
  );
};

export default ProductDetails;
