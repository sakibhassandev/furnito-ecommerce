import { Hero } from "./ui/home/Hero";
import { Range } from "./ui/home/Range";
// import HomeProducts from "./ui/home/HomeProducts";
import { HomePageCarousel } from "./ui/home/HomePageCarousel";
import { Feature } from "./ui/home/Feature";

export default function Home() {
  return (
    <main>
      <Hero />
      <Range />
      {/* <HomeProducts /> */}
      <HomePageCarousel />
      <Feature />
    </main>
  );
}
