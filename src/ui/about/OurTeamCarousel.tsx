"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { TeamMember } from "@/ui/about/OurTeamMember";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Kathryn Murphy",
    role: "CREATIVE DIRECTOR",
    image: "/assets/images/about-page/our-team-carousel-1.jpeg",
  },
  {
    name: "Guy Hawkins",
    role: "DEVELOPER",
    image: "/assets/images/about-page/our-team-carousel-2.jpeg",
  },
  {
    name: "Deli Yanky",
    role: "CONSULTING OFFICER",
    image: "/assets/images/about-page/our-team-carousel-3.jpeg",
  },
  {
    name: "Zin Denvar",
    role: "SALES MANAGER",
    image: "/assets/images/about-page/our-team-carousel-4.jpeg",
  },
  {
    name: "Sarah Wilson",
    role: "MARKETING DIRECTOR",
    image: "/assets/images/about-page/our-team-carousel-5.jpeg",
  },
];

export const OurTeamCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
      "(min-width: 1280px)": { slidesToScroll: 4 },
    },
  });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2 text-center md:text-left">
              One <span className="text-amber-400">Team</span>,
              <br />
              Many{" "}
              <span className="relative">
                Talents
                <span className="absolute bottom-2 left-0 w-full h-1 bg-amber-400"></span>
              </span>
            </h2>
          </div>
          <motion.button
            className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Our Team →
          </motion.button>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] min-w-0"
                >
                  <TeamMember {...member} />
                </div>
              ))}
            </div>
          </div>

          <motion.button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 hidden md:block"
            onClick={scrollPrev}
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 hidden md:block"
            onClick={scrollNext}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {teamMembers.map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === 2 ? "bg-pink-500" : "bg-gray-300"
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
