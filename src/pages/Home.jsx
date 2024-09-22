import { Hero } from "../components/Hero";
import { ProductList } from "../components/ProductList";
import { Range } from "../components/Range";

export const Home = () => {
  return (
    <>
      <Hero />
      <Range />
      <section className="mx-8 my-14 2xl:mx-auto max-w-screen-2xl">
        <h2 className="text-[#3A3A3A] font-bold text-4xl text-center">
          Our Product
        </h2>
        <ProductList />
      </section>
    </>
  );
};
