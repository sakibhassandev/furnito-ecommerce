import type { Metadata } from "next";
import { SectionCommonHeader } from "@/ui/common/SectionCommonHeader";
import { InfoHighlights } from "@/ui/common/InfoHighlights";
import { AboutCarousel } from "@/ui/about/AboutCarousel";
import { ServicesItem } from "@/ui/about/ServicesItem";
import OurAwards from "@/ui/about/OurAwards";
import GetInTouchSection from "@/ui/about/GetInTouch";
import { OurTeamCarousel } from "@/ui/about/OurTeamCarousel";

export const metadata: Metadata = {
  title: "About US",
};

const servicesItems = [
  {
    icon: "/assets/images/about-page/listed-products.svg",
    name: "Listed Products",
    count: "10k",
  },
  {
    icon: "/assets/images/about-page/lovely-customers.svg",
    name: "Lovely Customers",
    count: "5k",
  },
  {
    icon: "/assets/images/about-page/support.svg",
    name: "Support",
    count: "24h",
  },
];

const carouselItems = [
  {
    id: 1,
    image: "/assets/images/about-page/carousel-1.jpeg",
    title: "Innovation That Drives Us Forward",
    description: "Exploring the boundaries of technology and human potential",
  },
  {
    id: 2,
    image: "/assets/images/about-page/carousel-2.jpeg",
    title: "Connecting Through Technology",
    description: "Building bridges in the digital age",
  },
  {
    id: 3,
    image: "/assets/images/about-page/carousel-3.jpeg",
    title: "The Future of Work",
    description: "Embracing new ways of collaboration and creativity",
  },
];

const About = () => {
  return (
    <main>
      <section className="about-container">
        <SectionCommonHeader name="About Us" prev="Home" curr="About" />
        <div className="about-us-des py-28">
          <div className="w-full max-w-6xl gap-5 justify-between px-10 flex mx-auto">
            <div className="left-section">
              <h3 className="about__text-title text-3xl font-semibold text-[#03041c] mb-6">
                It started with a <br /> bang now we are here.
              </h3>
            </div>
            <div className="right-section w-full max-w-screen-sm text-[#525258]">
              <p>
                Ut at maximus magna. Vestibulum interdum sapien in facilisis
                imperdiet. Pellentesque habitant morbi tristique senectus et
                netus et malesuada fames ac turpis egestas. Proin ac placerat
                risus. Nullam eget tortor felis. Nulla facilisi.Vestibulum
                mattis diam non luctus elementum. Cras sollicitudin, nisi in
                semper viverra, felis diam consequat mi, quis tincidunt ligula
              </p>
              <p>
                Nam nibh diam, varius quis lectus eget, laoreet cursus metus.
                morbi augue lectus, dapibus eget justo nec, consectetur auctor
                nis luctus neque.!
              </p>
            </div>
          </div>
        </div>
        <div className="pb-28 services__area">
          <div className="mx-auto max-w-screen-xl">
            <div className="flex gap-5 services-items justify-center mx-auto flex-wrap">
              <ServicesItem servicesItems={servicesItems} />
            </div>
          </div>
        </div>
        <AboutCarousel slides={carouselItems} />
        <OurAwards />
        <GetInTouchSection />
        <OurTeamCarousel />
        <InfoHighlights />
      </section>
    </main>
  );
};

export default About;
