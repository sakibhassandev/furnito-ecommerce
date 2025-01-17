import { Hero } from "@/ui/home/Hero";
import { Range } from "@/ui/home/Range";
import { HomePageCarousel } from "@/ui/home/HomePageCarousel";
import { Feature } from "@/ui/home/Feature";
import StoreProvider from "@/store/StoreProvider";
import HomeProducts from "@/ui/home/HomeProducts";

export default function Home() {
  return (
    <main>
      <Hero />
      <Range />
      <StoreProvider>
        <HomeProducts /> {/*products list */}
      </StoreProvider>
      <HomePageCarousel />
      <Feature />
    </main>
  );
}
