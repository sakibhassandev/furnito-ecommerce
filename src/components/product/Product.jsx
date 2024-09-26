export const Product = ({ img, name, price, hasOffer, discountPrice }) => {
  return (
    <div className="product group">
      <div className="overflow-hidden rounded shadow-[0px_0px_8px_-3px_rgba(0,0,0,0.4)]">
        <div className="relative overflow-hidden ">
          <a href="/">
            <img
              src={img}
              alt={name}
              className="w-full h-full px-6 py-10 transition-all duration-300 ease-linear xsm:px-10 xsm:py-20 group-hover:scale-110"
            />
          </a>
          <div
            className={`${
              hasOffer ? "flex" : "hidden"
            } absolute left-0 flex flex-col flex-wrap text-white top-5`}
          >
            <span className="bg-[#f50963] inline-block text-sm leading-none py-1 px-[10px] capitalize mb-[5px]">
              Sale
            </span>
            <span className="bg-[#03041c] inline-block text-sm leading-none py-1 px-[10px] capitalize mb-[5px]">
              {hasOffer}
            </span>
          </div>
          <div className="absolute invisible opacity-0 transition-card translate-x-14 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 top-6 right-3 ">
            <button className="relative group/tooltip flex items-center justify-center mb-2 leading-9 text-center hover:text-white bg-white shadow-[0px_0px_8px_-3px_rgba(0,0,0,0.4)] hover:bg-[#f50963] w-9 h-9">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 26 24"
                fill="none"
                className="w-[18px] cursor-pointer wishlist"
              >
                <path
                  d="M7.167 1.5c-3.221 0-5.834 2.585-5.834 5.775 0 2.575 1.021 8.686 11.07 14.863a1.148 1.148 0 001.194 0c10.049-6.177 11.07-12.288 11.07-14.863 0-3.19-2.613-5.775-5.834-5.775C15.613 1.5 13 5 13 5s-2.612-3.5-5.833-3.5z"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="absolute group-hover/tooltip:right-full opacity-0 invisible group-hover/tooltip:visible group-hover/tooltip:opacity-100 ease-out duration-300 -translate-y-1/2 top-1/2 w-max right-[90%] bg-[#03041c] text-white py-1 px-2 text-xs z-10 inline-block mr-2 leading-none after:content-[''] after:absolute after:bg-[#03041c] after:right-0 after:top-1/2 after:-translate-y-1/2 after:translate-x-1/2 after:rotate-45 after:h-2 after:w-2 ">
                Add To Wishlist
              </span>
            </button>
            <button className="relative group/tooltip flex items-center justify-center mb-2 leading-9 text-center hover:text-white bg-white shadow-[0px_0px_8px_-3px_rgba(0,0,0,0.4)] hover:bg-[#f50963] w-9 h-9">
              <svg
                width={19}
                height={16}
                viewBox="0 0 19 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.5 5.35a2.291 2.291 0 00-2.291 2.287 2.29 2.29 0 004.582 0A2.292 2.292 0 009.499 5.35m0 5.996a3.716 3.716 0 01-3.715-3.709 3.717 3.717 0 017.432 0 3.717 3.717 0 01-3.717 3.709"
                  fill="currentColor"
                />
                <path
                  d="M1.491 7.637c1.767 3.897 4.744 6.214 8.009 6.215 3.265-.001 6.242-2.318 8.009-6.215C15.742 3.74 12.765 1.424 9.5 1.423c-3.264 0-6.242 2.318-8.009 6.214zm8.01 7.637h-.004c-3.93-.003-7.458-2.752-9.44-7.357a.712.712 0 010-.561C2.04 2.752 5.57.003 9.498 0h.006c3.929.003 7.457 2.752 9.439 7.356a.704.704 0 010 .561c-1.98 4.605-5.51 7.354-9.44 7.357z"
                  fill="currentColor"
                />
              </svg>
              <span className="absolute group-hover/tooltip:right-full opacity-0 invisible group-hover/tooltip:visible group-hover/tooltip:opacity-100 ease-out duration-300 -translate-y-1/2 top-1/2 w-max right-[90%] bg-[#03041c] text-white py-1 px-2 text-xs z-10 inline-block mr-2 leading-none after:content-[''] after:absolute after:bg-[#03041c] after:right-0 after:top-1/2 after:-translate-y-1/2 after:translate-x-1/2 after:rotate-45 after:h-2 after:w-2 ">
                Quick view
              </span>
            </button>
          </div>
          <div className="absolute left-0 right-0 transition-all duration-300 ease-out group-hover:bottom-0 -bottom-10 addToCart">
            <a
              type="button"
              href="/cart"
              className="flex justify-center items-center gap-2 transition-all ease-out duration-300 hover:bg-[#f50963] text-white font-semibold py-2 bg-black"
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
            </a>
          </div>
        </div>
      </div>
      <div className="pt-4 ">
        <h3>
          <a href="/" className="hover:text-[#f50963] ease-out duration-300">
            {name}
          </a>
        </h3>
        <div>
          <span>${hasOffer ? discountPrice : price}</span>
          <del className={`${hasOffer ? "" : "hidden"} ml-2`}>
            {discountPrice ? "$" + price : ""}
          </del>
        </div>
      </div>
    </div>
  );
};
