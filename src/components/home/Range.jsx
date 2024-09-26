import diningTableImg from "../../assets/images/range-section/dining-table.png";
import livingRoomImg from "../../assets/images/range-section/living-room.png";
import bedRoomImg from "../../assets/images/range-section/bed-room.png";

export const Range = () => {
  return (
    <section className="mx-auto my-14 max-w-screen-2xl">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold md:text-3xl">Browse The Range</h2>
        <p className="text-base md:text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      <div className="flex flex-col justify-center gap-5 mx-8 max-sm:gap-8 max-sm:items-center sm:flex-row 2xl:justify-between">
        <a href="/" className="text-center">
          <img
            src={diningTableImg}
            alt="diningTableImg"
            className="transition-all duration-300 ease-in-out rounded-md hover:scale-105"
          />
          <h4 className="mt-4 text-xl font-semibold md:text-2xl md:mt-7">
            Dining
          </h4>
        </a>

        <a href="/" className="text-center">
          <img
            src={livingRoomImg}
            alt="livingRoomImg"
            className="transition-all duration-300 ease-in-out rounded-md hover:scale-105"
          />
          <h4 className="mt-4 text-xl font-semibold md:text-2xl md:mt-7">
            Living
          </h4>
        </a>

        <a href="/" className="text-center">
          <img
            src={bedRoomImg}
            alt="bedRoomImg"
            className="transition-all duration-300 ease-in-out rounded-md hover:scale-105"
          />
          <h4 className="mt-4 text-xl font-semibold md:text-2xl md:mt-7">
            Bedroom
          </h4>
        </a>
      </div>
    </section>
  );
};
