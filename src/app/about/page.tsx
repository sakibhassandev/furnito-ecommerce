import type { Metadata } from "next";
import Image from "next/image";
import { SectionCommonHeader } from "@/ui/common/SectionCommonHeader";
import { InfoHighlights } from "@/ui/common/InfoHighlights";

// Icons
import { GoArrowUpRight } from "react-icons/go";

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
              {servicesItems.map((item, i) => (
                <div
                  key={i}
                  className="group hover:shadow-[0_10px_10px_rgba(3,4,28,0.1)] hover:border-white border border-[#eaeaef] xl:p-[40px_42px_37px_40px] p-[30px_25px_27px] service-item-hover service-item w-full xl:max-w-[350px] max-w-[320px]"
                >
                  <div className="top flex mb-9 items-center justify-between">
                    <Image
                      className="group-hover:-translate-y-[5px] service-item-hover w-10 h-10"
                      src={item.icon}
                      alt={item.name}
                      width={50}
                      height={50}
                    />
                    <a href="">
                      <GoArrowUpRight className="text-3xl hover:text-[#f50963] ease-linear duration-200" />
                    </a>
                  </div>
                  <div className="bottom">
                    <span className="text-[#525258] text-sm">{item.count}</span>
                    <h3 className="w-fit xl:text-[26px] text-2xl font-semibold cursor-pointer before:absolute before:w-0 hover:before:w-full before:ease-linear before:duration-200 before:h-[2px] before:bg-black before:bottom-0 relative">
                      {item.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <InfoHighlights />
      </section>
    </main>
  );
};

export default About;
