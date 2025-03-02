import Link from "next/link";

export const Hero = () => {
  return (
    <section
      className={`max-w-[1920px] mx-auto relative min-h-[700px] 2xl:min-h-[1000px] bg-hero-bg bg-no-repeat bg-cover bg-center`}
    >
      <div className="bg-[#FFF3E3] px-4 py-4 xsm:px-7 xsm:py-6 md:px-12 md:py-10 absolute right-8 md:right-14 top-1/2 -translate-y-1/2 rounded-md">
        <p className="text-[#333] text-sm xsm:text-base mb-2 font-bold">
          New Arrival
        </p>
        <h3 className="text-xl xsm:text-3xl md:text-5xl max-w-[250px] md:max-w-[400px] text-[#B88E2F] font-bold mb-2 md:mb-4">
          Discover Our New Collection
        </h3>
        <p className="text-sm xsm:text-base max-w-[450px] md:max-w-[501px] mb-4 md:mb-7">
          Discover our latest collection of luxury furniture designed to
          transform your living space into a stylish and comfortable sanctuary.
        </p>
        <Link
          href="/shop"
          className="transition-all ease duration-300 inline-block px-6 py-2 md:px-10 md:py-4 font-semibold rounded-sm bg-[#B88E2F] hover:bg-[#ddad3d] text-white"
        >
          Buy Now
        </Link>
      </div>
    </section>
  );
};
