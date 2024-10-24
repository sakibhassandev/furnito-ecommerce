import { Hero } from "./ui/home/Hero";
import { Range } from "./ui/home/Range";
// import HomeProducts from "./ui/home/HomeProducts";
import { HomePageCarousel } from "./ui/home/HomePageCarousel";
import { Feature } from "./ui/home/Feature";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <main>
      <Hero />
      <Range />
      {/* <HomeProducts /> */}
      <HomePageCarousel />
      <Feature />
      <ToastContainer className="text-sm" />
    </main>
  );
}
