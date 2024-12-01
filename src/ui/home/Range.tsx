import Image from "next/image";
import Link from "next/link";

export const Range = () => {
  return (
    <section className="mx-auto my-14 max-w-screen-2xl">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold md:text-3xl">Browse The Range</h2>
        <p className="text-base md:text-xl">
          Browse what you desire for your home
        </p>
      </div>

      <div className="flex flex-col justify-center gap-5 mx-8 max-sm:gap-8 max-sm:items-center sm:flex-row 2xl:justify-between">
        <Link href="/" className="text-center">
          <Image
            src="/assets/images/range-section/dining-table.webp"
            alt="diningTableImg"
            width={380}
            height={480}
            className="transition-all duration-300 ease-in-out rounded-md hover:scale-105"
          />
          <h4 className="mt-4 text-xl font-semibold md:text-2xl md:mt-7">
            Dining
          </h4>
        </Link>

        <Link href="/" className="text-center">
          <Image
            src="/assets/images/range-section/living-room.webp"
            alt="livingRoomImg"
            width={380}
            height={480}
            className="transition-all duration-300 ease-in-out rounded-md hover:scale-105"
          />
          <h4 className="mt-4 text-xl font-semibold md:text-2xl md:mt-7">
            Living
          </h4>
        </Link>

        <Link href="/" className="text-center">
          <Image
            src="/assets/images/range-section/bed-room.webp"
            alt="bedRoomImg"
            width={380}
            height={480}
            className="transition-all duration-300 ease-in-out rounded-md hover:scale-105"
          />
          <h4 className="mt-4 text-xl font-semibold md:text-2xl md:mt-7">
            Bedroom
          </h4>
        </Link>
      </div>
    </section>
  );
};
