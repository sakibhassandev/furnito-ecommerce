import { useEffect, useRef, useState } from "react";
import { isQuickViewOpen } from "../../store/slices/QuickViewSlice";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../../store/slices/cartSlice";
import { addWishListItem } from "../../store/slices/wishListSlice";
import { Bounce, toast } from "react-toastify";

// Icons
import { FaLink } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

export const QuickView = ({ quickViewProduct }) => {
  // Indexes
  const [imgIndex, setImgIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [sizesIndex, setSizesIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // References
  const imagesRef = useRef();
  const colorsRef = useRef();
  const sizesRef = useRef();

  const dispatch = useDispatch();
  const isQuickView = useSelector((state) => state.quickView);
  const discountPrice = parseFloat(
    (quickViewProduct.hasDiscount
      ? quickViewProduct.price -
        (quickViewProduct.price * quickViewProduct.hasDiscount) / 100
      : 0
    ).toFixed(2)
  );

  if (isQuickView) {
    document.querySelector("body").classList.add("overflow-hidden");
  } else {
    document.querySelector("body").classList.remove("overflow-hidden");
  }

  let bigImage;
  if (quickViewProduct && quickViewProduct.images) {
    bigImage = Object.values(quickViewProduct.images)[colorIndex][imgIndex];
  }

  // product details variables
  const { name, price, id } = quickViewProduct;

  useEffect(() => {
    if (imagesRef.current) {
      for (let i = 0; i < imagesRef.current.children.length; i++) {
        imagesRef.current?.children[i].classList.add(
          "after:invisible",
          "after:opacity-0"
        );
      }
      imagesRef.current.children[imgIndex]?.classList.remove(
        "after:invisible",
        "after:opacity-0"
      );
    }
    if (colorsRef.current) {
      for (let i = 0; i < colorsRef.current.children.length; i++) {
        colorsRef.current?.children[i].classList.remove(
          "border",
          "animate-[swatch-pulse_1.2s_ease-in-out_infinite_alternate]"
        );
      }
      colorsRef.current.children[imgIndex]?.classList.add(
        "border",
        "animate-[swatch-pulse_1.2s_ease-in-out_infinite_alternate]"
      );
    }
    if (sizesRef.current) {
      for (let i = 0; i < sizesRef.current.children.length; i++) {
        sizesRef.current?.children[i].classList.remove("sizes-active");
      }
      sizesRef.current.children[sizesIndex]?.classList.add("sizes-active");
    }
  }, [isQuickView]);

  return (
    <div
      className={`${
        isQuickView
          ? "opacity-100 visible top-0"
          : "opacity-0 invisible -top-12"
      } fixed left-0 z-50 flex w-full ease-out duration-300 h-full overflow-x-hidden overflow-y-auto lg:items-center`}
    >
      <div className="relative max-w-[1200px] mx-auto product_modal z-50">
        <div className="relative p-10 mx-3 bg-white shadow-md modal-content">
          <div className="modal-wrapper">
            <button
              onClick={() => dispatch(isQuickViewOpen("closeQuickView"))}
              className="absolute block space-y-1 duration-200 ease-linear hover:text-[#f50963] cursor-pointer top-5 right-5 hover:rotate-90"
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
            <div className="flex flex-col lg:flex-row product-details">
              <div className="self-center max-lg:self-center lg:mr-10 left">
                <div className="product-img">
                  <div className="lg:h-[400px] lg:w-[433px]">
                    <img
                      className="object-fill w-full h-full shadow-[0px_0px_8px_-3px_rgba(0,0,0,0.4)]"
                      src={bigImage}
                      alt="cover-image"
                    />
                  </div>
                </div>
                <div
                  className="flex flex-wrap gap-3 product-options"
                  ref={imagesRef}
                >
                  {quickViewProduct.images &&
                    Object.values(quickViewProduct.images)[colorIndex].map(
                      (url, i) => {
                        return (
                          <button
                            onClick={() => {
                              setImgIndex(i);
                              const imageChildren = imagesRef.current.children;
                              for (let i = 0; i < imageChildren.length; i++) {
                                imageChildren[i].classList.add(
                                  "after:invisible",
                                  "after:opacity-0"
                                );
                              }
                              imageChildren[i].classList.remove(
                                "after:opacity-0",
                                "after:invisible"
                              );
                            }}
                            className={`after:content-[''] after:ease-linear after:duration-300 after:absolute after:w-full after:h-full after:left-0 after:top-0 after:bg-transparent after:border after:border-[#f50963] relative w-24 h-24 mt-4 mb-3 sm:w-32 sm:h-32 lg:w-24 lg:h-24`}
                            key={i}
                          >
                            <img
                              className="w-full h-full object-contain shadow-[0px_0px_8px_-3px_rgba(0,0,0,0.4)] p-2"
                              src={url}
                              alt=""
                            />
                          </button>
                        );
                      }
                    )}
                </div>
              </div>
              <div className="right">
                <div className="product-information">
                  <h3 className="text-4xl font-medium mb-1 text-[#03041c] product-title">
                    {quickViewProduct.name}
                  </h3>
                  <p className="my-5">{quickViewProduct.description}</p>
                  <div className="mb-4 sizes">
                    <p className="text-[#9F9F9F] text-sm mb-3">Size</p>
                    <div className="flex items-center gap-4" ref={sizesRef}>
                      {quickViewProduct.sizes?.map((size, i) => {
                        return (
                          <span
                            onClick={() => {
                              setSizesIndex(i);
                              const sizesChildren = sizesRef.current?.children;
                              for (let i = 0; i < sizesChildren.length; i++) {
                                sizesChildren[i].classList.remove(
                                  "sizes-active"
                                );
                              }
                              sizesChildren[i].classList.add("sizes-active");
                            }}
                            key={i}
                            className="bg-[#F9F1E7] py-2 px-3 flex justify-center text-sm items-center text-black rounded-md cursor-pointer"
                          >
                            {size}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mb-4 sizes">
                    <p className="text-[#9F9F9F] text-sm mb-3">Color</p>
                    <div className="flex items-center gap-3" ref={colorsRef}>
                      {quickViewProduct.colors?.map((color, i) => {
                        return (
                          <img
                            onClick={() => {
                              setColorIndex(i);
                              const colorChildren = colorsRef.current.children;
                              for (let i = 0; i < colorChildren.length; i++) {
                                colorChildren[i].classList.remove(
                                  "border",
                                  "animate-[swatch-pulse_1.2s_ease-in-out_infinite_alternate]"
                                );
                              }
                              colorChildren[i].classList.add(
                                "border",
                                "animate-[swatch-pulse_1.2s_ease-in-out_infinite_alternate]"
                              );
                            }}
                            key={i}
                            className="relative w-[1.75rem] shadow-[0px_0px_8px_-3px_rgba(0,0,0,0.4)] animate-[swatch-pulse_1.2s_ease-in-out_infinite_alternate] h-[1.75rem] p-[2px] border border-[#f50963] rounded-full cursor-pointer"
                            src={color.image}
                            alt={color.name}
                            title={`Select Color: ${color.name}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className="product__price text-[#525258]">
                    <span>
                      $
                      {quickViewProduct.hasDiscount
                        ? discountPrice
                        : quickViewProduct.price}
                    </span>
                    <del
                      className={`${
                        quickViewProduct.hasDiscount ? "" : "hidden"
                      } ml-2`}
                    >
                      {quickViewProduct.hasDiscount
                        ? "$" + quickViewProduct.price
                        : ""}
                    </del>
                  </div>
                  <div className="flex flex-wrap items-center mt-3 mb-10">
                    <button
                      onClick={() => {
                        if (quantity > 1) {
                          setQuantity((prev) => prev - 1);
                        }
                      }}
                      className="w-6 h-6 hover:text-[#f50963] ease-out duration-300 p-1 rounded-full me-3"
                      type="button"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div>
                      <input
                        value={quantity}
                        onChange={() => ""}
                        id="product"
                        className=" w-14 border focus:border-[#f50963] ease-out duration-300 text-center outline-none text-sm rounded-lg block px-2.5 py-1 "
                      />
                    </div>
                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="w-6 hover:text-[#f50963] ease-out duration-300 h-6 p-1 rounded-full ms-3"
                      type="button"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="max-sm:flex-col flex items-center gap-2 pb-8 mb-8 border-b border-[#dadce0]">
                    <button
                      onClick={() => {
                        dispatch(
                          addCartItem({
                            id,
                            img: Object.values(quickViewProduct?.images)[0][0],
                            name,
                            price,
                            discountPrice,
                            quantity: quantity,
                          })
                        );
                        toast.success(`${name} added to cart`, {
                          position: "top-center",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                          transition: Bounce,
                        });
                      }}
                      type="button"
                      className="max-sm:w-full flex p-[13px_35px] items-center gap-2 transition-all ease-out duration-300 hover:bg-[#f50963] text-white font-semibold bg-black"
                    >
                      <svg
                        width={18}
                        height={18}
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.544 4.805l.543 6.444c.04.496.446.868.941.868h9.826a.95.95 0 00.936-.812l.855-5.893a.526.526 0 00-.101-.393.522.522 0 00-.35-.208c-.187.007-7.993-.003-12.65-.006zm1.482 8.66a2.304 2.304 0 01-2.285-2.106l-.824-9.788-1.356-.234A.676.676 0 01.01.557.683.683 0 01.79.01l1.872.323A.677.677 0 013.22.94l.212 2.517c12.848.005 12.89.012 12.952.019.501.073.942.334 1.243.737.3.401.426.896.354 1.392l-.854 5.892a2.305 2.305 0 01-2.27 1.967h-9.83z"
                          fill="currentColor"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.408 8.126h-2.495a.674.674 0 110-1.348h2.495a.675.675 0 110 1.348zM4.64 15.905a.489.489 0 110 .98.49.49 0 110-.98z"
                          fill="currentColor"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.639 16.21a.185.185 0 00-.185.184c0 .205.37.205.37 0a.186.186 0 00-.185-.184zm0 1.347a1.165 1.165 0 01-1.165-1.164 1.164 1.164 0 012.33 0c0 .642-.523 1.164-1.165 1.164zM14.792 15.905a.49.49 0 11.001.98.49.49 0 01-.001-.98z"
                          fill="currentColor"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.79 16.21c-.1 0-.183.083-.183.184 0 .206.37.205.369 0a.186.186 0 00-.185-.184zm0 1.347a1.165 1.165 0 01-1.164-1.164 1.164 1.164 0 012.331 0c0 .642-.523 1.164-1.166 1.164z"
                          fill="currentColor"
                        />
                      </svg>
                      Add to Cart
                    </button>
                    <div className="flex gap-3 max-sm:self-start">
                      <button
                        onClick={() => {
                          dispatch(
                            addWishListItem({
                              id,
                              img: Object.values(
                                quickViewProduct?.images
                              )[0][0],
                              name,
                              price,
                              discountPrice,
                              quantity: quantity,
                            })
                          );
                          toast.success(`${name} added to wishlist`, {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
                          });
                        }}
                        className="relative group/tooltip flex items-center justify-center text-center hover:text-white bg-white shadow-[0px_0px_8px_-3px_rgba(0,0,0,0.4)] hover:bg-[#f50963] w-12 h-12"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 26 24"
                          fill="none"
                          className="w-[22px] cursor-pointer wishlist"
                        >
                          <path
                            d="M7.167 1.5c-3.221 0-5.834 2.585-5.834 5.775 0 2.575 1.021 8.686 11.07 14.863a1.148 1.148 0 001.194 0c10.049-6.177 11.07-12.288 11.07-14.863 0-3.19-2.613-5.775-5.834-5.775C15.613 1.5 13 5 13 5s-2.612-3.5-5.833-3.5z"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="absolute group-hover/tooltip:-top-5 opacity-0 invisible group-hover/tooltip:visible group-hover/tooltip:opacity-100 ease-out duration-300 -translate-y-1/2 top-0 w-max left-1/2 -translate-x-1/2 bg-[#03041c] text-white py-1 px-2 text-xs z-10 inline-block leading-none after:content-[''] after:absolute after:bg-[#03041c] after:-bottom-1 after:-z-30 after:left-1/2 after:-translate-x-1/2 after:rotate-45 after:h-2 after:w-2 ">
                          Add To Wishlist
                        </span>
                      </button>
                      <button className="relative group/product-detail flex items-center justify-center text-center hover:text-white bg-white shadow-[0px_0px_8px_-3px_rgba(0,0,0,0.4)] hover:bg-[#f50963] w-12 h-12">
                        <FaLink className="text-2xl" />
                        <span className="absolute group-hover/product-detail:-top-5 opacity-0 invisible group-hover/product-detail:visible group-hover/product-detail:opacity-100 ease-out duration-300 -translate-y-1/2 top-0 w-max left-1/2 -translate-x-1/2 bg-[#03041c] text-white py-1 px-2 text-xs z-10 inline-block leading-none after:content-[''] after:absolute after:bg-[#03041c] after:-bottom-1 after:-z-30 after:left-1/2 after:-translate-x-1/2 after:rotate-45 after:h-2 after:w-2 ">
                          Product Details
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="product__details-sku product__details-more">
                    <p className="inline-block mb-1 font-semibold text-[#03041c]">
                      SKU:
                    </p>
                    <span className="text-[#525258]">
                      {quickViewProduct?.sku}
                    </span>
                  </div>
                  <div className="mb-4 product__details-categories">
                    <p className="inline-block mb-1 font-semibold text-[#03041c]">
                      Categories:
                    </p>
                    {quickViewProduct.categories?.map((el, i) => {
                      return (
                        <span key={i}>
                          <a
                            href="#"
                            className="hover:text-[#f50963] ease-out duration-300"
                          >
                            {el},
                          </a>
                        </span>
                      );
                    })}
                  </div>
                  <div className="mb-4 product__details-tag">
                    <span className="inline-block mb-1 mr-1 font-semibold text-[#03041c]">
                      Tags:
                    </span>
                    {quickViewProduct.tags?.map((el, i) => {
                      return (
                        <a
                          key={i}
                          href="#"
                          className="text-sm leading-none text-[#525258] p-[4px_12px] mb-2 inline-block border border-[#dadce0] hover:bg-[#f50963] hover:border-[#f50963] hover:text-white ease-out duration-300"
                        >
                          {el}
                        </a>
                      );
                    })}
                  </div>
                  <div className="flex items-center product__details-share">
                    <span className="inline-block mb-1 mr-1 font-semibold text-[#03041c]">
                      Share:
                    </span>
                    <a
                      href="http://facebook.com"
                      target="_blank"
                      className="inline-block mb-2 mr-3 text-[#525258] leading-none text-sm"
                    >
                      <FaFacebookF className="hover:text-[#f50963] ease-linear duration-300" />
                    </a>
                    <a
                      href="http://twitter.com"
                      target="_blank"
                      className="inline-block mb-2 mr-3 text-[#525258] leading-none text-sm"
                    >
                      <FaTwitter className="hover:text-[#f50963] ease-linear duration-300" />
                    </a>
                    <a
                      href="https://www.linkedin.com/"
                      target="_blank"
                      className="inline-block mb-2 mr-3 text-[#525258] leading-none text-sm"
                    >
                      <FaLinkedin className="hover:text-[#f50963] ease-linear duration-300" />
                    </a>
                    <a
                      href="https://www.youtube.com/"
                      target="_blank"
                      className="inline-block mb-2 mr-3 text-[#525258] leading-none text-sm"
                    >
                      <FaYoutube className="hover:text-[#f50963] ease-linear duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
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
