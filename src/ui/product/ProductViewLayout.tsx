import { useEffect, useRef, useState } from "react";
import { ProductType } from "@/lib/definitions";
import { useDispatch } from "react-redux";
import { addCartItem } from "@/store/slices/cartSlice";
import { addWishListItem } from "@/store/slices/wishListSlice";
import ImageGallery from "./ImageGallery";
import { toast } from "react-toastify";

// Icons
import { Facebook, Linkedin, LinkIcon, Twitter, Youtube } from "lucide-react";
import SizeSelector from "./SizeSelector";
import ColorSelector from "./ColorSelector";
import Link from "next/link";

const ProductViewLayout = ({
  product,
  isQuickView = false,
  containerClass,
}: {
  product: ProductType;
  isQuickView?: boolean;
  containerClass: string;
}) => {
  const dispatch = useDispatch();

  // Indexes
  const [imgIndex, setImgIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [sizesIndex, setSizesIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // References
  const imagesRef = useRef<HTMLDivElement>(null);
  const colorsRef = useRef<HTMLDivElement>(null);
  const sizesRef = useRef<HTMLDivElement>(null);

  const discountPrice = parseFloat(
    (product?.hasDiscount
      ? product.price - (product.price * product.hasDiscount) / 100
      : 0
    ).toFixed(2)
  );

  // product details variables
  const { name, price, id } = product || {};

  const shareLinks = [
    {
      name: "facebook",
      url: "https://facebook.com/",
      icon: (
        <Facebook className="hover:text-[#B88E2F] ease-linear duration-300" />
      ),
    },
    {
      name: "twitter",
      url: "https://twitter.com/",
      icon: (
        <Twitter className="hover:text-[#B88E2F] ease-linear duration-300" />
      ),
    },
    {
      name: "linkedin",
      url: "https://www.linkedin.com/",
      icon: (
        <Linkedin className="hover:text-[#B88E2F] ease-linear duration-300" />
      ),
    },
    {
      name: "youtube",
      url: "https://www.youtube.com/",
      icon: (
        <Youtube className="hover:text-[#B88E2F] ease-linear duration-300" />
      ),
    },
  ];

  useEffect(() => {
    if (imagesRef.current) {
      for (let i = 0; i < imagesRef.current.children.length; i++) {
        imagesRef.current.children[i].classList.add(
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
        colorsRef.current.children[i].classList.remove(
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
        sizesRef.current.children[i].classList.remove("sizes-active");
      }
      sizesRef.current.children[sizesIndex]?.classList.add("sizes-active");
    }

    if (isQuickView) {
      document.querySelector("body")?.classList.add("overflow-hidden");
    } else {
      document.querySelector("body")?.classList.remove("overflow-hidden");
    }

    return () => {
      setImgIndex(0);
      setColorIndex(0);
      setSizesIndex(0);
      setQuantity(1);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  return (
    <div className={containerClass}>
      <div className="self-center max-lg:self-center lg:mr-10 left">
        <ImageGallery
          imageContainerClass={
            isQuickView ? "lg:h-[400px] lg:w-[433px]" : "lg:w-[550px]"
          }
          images={product?.images}
          colorIndex={colorIndex}
          imgIndex={imgIndex}
          setImgIndex={setImgIndex}
          imagesRef={imagesRef}
        />
      </div>
      <div className="right">
        <div className="product-information">
          <h3 className="text-xl xsm:text-2xl md:text-4xl font-medium mb-1 text-[#03041c] product-title">
            {product?.name}
          </h3>
          <p className="my-5 max-xsm:text-sm">{product?.description}</p>
          <SizeSelector
            sizesRef={sizesRef}
            setSizesIndex={setSizesIndex}
            Product={product}
          />
          <ColorSelector
            setColorIndex={setColorIndex}
            colorsRef={colorsRef}
            Product={product}
          />
          <div className="product__price text-[#525258] xsm:text-lg">
            <span>
              ${product?.hasDiscount ? discountPrice : product?.price}
            </span>
            <del className={`${product?.hasDiscount ? "" : "hidden"} ml-2`}>
              {product?.hasDiscount ? "$" + product?.price : ""}
            </del>
          </div>
          <div className="flex flex-wrap items-center mt-3 mb-10">
            <button
              onClick={() => {
                if (quantity > 1) {
                  setQuantity((prev) => prev - 1);
                }
              }}
              className="w-4 xsm:w-6 h-4 xsm:h-6 hover:text-[#B88E2F] ease-out duration-300 p-1 rounded-full me-3"
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
                className=" w-14 border focus:border-[#B88E2F] ease-out duration-300 text-center outline-none text-sm rounded-lg block px-2.5 py-1 "
              />
            </div>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="w-6 hover:text-[#B88E2F] ease-out duration-300 h-6 p-1 rounded-full ms-3"
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
                    img: product?.images
                      ? product.images[colorIndex].url[0]
                      : "",
                    name,
                    price,
                    discountPrice,
                    quantity,
                    size: product?.sizes?.[sizesIndex],
                    color: product?.colors?.[colorIndex].name,
                  })
                );
                toast.success(`${name} added to cart`, {
                  position: "top-center",
                  autoClose: 2000,
                  theme: "light",
                });
              }}
              type="button"
              className="max-sm:w-full flex p-[9px_25px] xsm:p-[13px_35px] items-center gap-2 transition-all ease-out duration-300 bg-[#B88E2F] hover:bg-[#96732B] text-white font-semibold"
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
                      img: product?.images ? product.images[0].url[0] : "",
                      name,
                      price,
                      discountPrice,
                      quantity,
                      size: product?.sizes?.[sizesIndex],
                    })
                  );
                  toast.success(`${name} added to wishlist`, {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "light",
                  });
                }}
                className="relative group/tooltip flex items-center justify-center text-center hover:text-white bg-white shadow-[0px_0px_8px_-3px_rgba(0,0,0,0.4)] hover:bg-[#B88E2F] w-10 xsm:w-12 h-10 xsm:h-12"
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
              {isQuickView && (
                <Link
                  href={`/product-details/${product?.id}`}
                  target="_blank"
                  className="relative group/product-detail flex items-center justify-center text-center hover:text-white bg-white shadow-[0px_0px_8px_-3px_rgba(0,0,0,0.4)] hover:bg-[#B88E2F] w-12 h-12"
                >
                  <LinkIcon className="text-2xl" />
                  <span className="absolute group-hover/product-detail:-top-5 opacity-0 invisible group-hover/product-detail:visible group-hover/product-detail:opacity-100 ease-out duration-300 -translate-y-1/2 top-0 w-max left-1/2 -translate-x-1/2 bg-[#03041c] text-white py-1 px-2 text-xs z-10 inline-block leading-none after:content-[''] after:absolute after:bg-[#03041c] after:-bottom-1 after:-z-30 after:left-1/2 after:-translate-x-1/2 after:rotate-45 after:h-2 after:w-2 ">
                    Product Details
                  </span>
                </Link>
              )}
            </div>
          </div>
          <div className="mb-4 product__details-sku product__details-more">
            <p className="inline-block mb-1 font-semibold text-[#03041c]">
              SKU:
            </p>
            <span className="max-xsm:text-sm text-[#525258]">
              {product?.sku}
            </span>
          </div>
          <div className="mb-4 product__details-categories">
            <p className="inline-block mb-1 font-semibold max-xsm:text-sm text-[#03041c]">
              Categories:
            </p>
            {product?.categories?.map((el, i) => {
              return (
                <span key={i}>
                  <a
                    href="#"
                    className="hover:text-[#B88E2F] ease-out duration-300"
                  >
                    {" "}
                    {el?.toUpperCase()},
                  </a>
                </span>
              );
            })}
          </div>
          <div className="mb-4 product__details-tags">
            <span className="inline-block mb-1 mr-1 font-semibold text-[#03041c]">
              Tags:
            </span>
            {product?.tags?.map((el, i) => {
              return (
                <a
                  key={i}
                  href="#"
                  className="text-sm leading-none text-[#525258] p-[2px_8px] xsm:p-[4px_12px] mb-2 inline-block border border-[#dadce0] hover:bg-[#B88E2F] hover:border-[#B88E2F] hover:text-white ease-out duration-300"
                >
                  {el?.toUpperCase()}
                </a>
              );
            })}
          </div>
          <div className="flex items-center product__details-share">
            <span className="inline-block mb-1 mr-1 font-semibold text-[#03041c]">
              Share:
            </span>
            {shareLinks.map((link) => (
              <Link
                href={link.url}
                key={link.name}
                className="inline-block mb-2 mr-3 text-[#525258] leading-none text-sm"
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewLayout;
