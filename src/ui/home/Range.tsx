import Image from "next/image";
import Link from "next/link";

export const Range = () => {
  const ranges = [
    {
      title: "Dining",
      image: "/assets/images/range-section/dining-table.webp",
      alt: "diningTableImg",
    },
    {
      title: "Living",
      image: "/assets/images/range-section/living-room.webp",
      alt: "livingRoomImg",
    },
    {
      title: "Bedroom",
      image: "/assets/images/range-section/bed-room.webp",
      alt: "bedRoomImg",
    },
  ];

  return (
    <section className="mx-auto my-14 max-w-screen-2xl">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold md:text-3xl">Browse The Range</h2>
        <p className="text-base md:text-xl">
          Browse what you desire for your home
        </p>
      </div>

      <div className="flex flex-col justify-center gap-5 mx-8 max-sm:gap-8 max-sm:items-center sm:flex-row 2xl:justify-between">
        {ranges.map((range) => (
          <Link href="/shop" className="text-center" key={range.title}>
            <Image
              src={range.image}
              alt={range.alt}
              width={380}
              height={480}
              className="transition-all duration-300 ease-in-out rounded-md hover:scale-105"
            />
            <h4 className="mt-4 text-xl font-semibold md:text-2xl md:mt-7">
              {range.title}
            </h4>
          </Link>
        ))}
      </div>
    </section>
  );
};
