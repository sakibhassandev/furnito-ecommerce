import { Hero } from "./ui/home/Hero";
import { Range } from "./ui/home/Range";
import { HomePageCarousel } from "./ui/home/HomePageCarousel";
import { Feature } from "./ui/home/Feature";
import StoreProvider from "./store/slices/StoreProvider";

export default function Home() {
  return (
    <main>
      <Hero />
      <Range />
      <StoreProvider /> {/*products list */}
      <HomePageCarousel />
      <Feature />
    </main>
  );
}
