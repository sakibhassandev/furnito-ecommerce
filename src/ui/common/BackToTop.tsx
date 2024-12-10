"use client";

import { useEffect } from "react";

export const BackToTop = () => {
  useEffect(() => {
    // Event listener to show/hide "Back to Top" button based on scroll position
    const handleScroll = () => {
      const backToTop = document.querySelector(".back-to-top");
      if (window.scrollY > 150) {
        backToTop?.classList.add("!bottom-[50px]", "!opacity-100", "!visible");
      } else {
        backToTop?.classList.remove(
          "!bottom-[50px]",
          "!opacity-100",
          "!visible"
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-0 z-50 opacity-0 invisible hover:-translate-y-1 duration-300 ease-out rounded-full cursor-pointer back-to-top right-[50px] h-11 w-11"
    >
      <button className="flex justify-center items-center w-11 h-11 text-center bg-[#03041c] shadow-[0_8px_16px_rgba(3,4,28,.3)] text-white rounded-full">
        <svg
          className="-translate-y-[1px]"
          fill="none"
          height="7"
          viewBox="0 0 12 7"
          width="12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 6L6 1L1 6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </button>
    </div>
  );
};
