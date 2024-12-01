import { EmblaCarousel } from "./EmblaCarousel";

export const HomePageCarousel = () => {
  return (
    <section className="bg-[#FCF8F3] py-11 my-14 max-w-[1920px] mx-auto">
      <div className="flex flex-col-reverse items-center gap-10 mx-4 md:flex-row xsm:mx-8 max-w-screen-2xl 2xl:mx-auto">
        <div className="max-w-md max-md:mr-auto">
          <h3 className="mb-2 text-2xl lg:text-4xl font-bold text-[#3A3A3A]">
            50+ Beautiful rooms inspiration
          </h3>
          <p className="text-sm lg:text-base mb-6 font-medium text-[#616161]">
            Our designer already made a lot of beautiful prototipe of rooms that
            inspire you
          </p>
          <a
            href="/shop"
            className="inline-block px-6 lg:px-8 py-3 lg:py-4 hover:bg-[#ddad3d] rounded ease-linear duration-300 text-white bg-[#B88E2F]"
          >
            Explore More
          </a>
        </div>
        <EmblaCarousel />
      </div>
    </section>
  );
};
