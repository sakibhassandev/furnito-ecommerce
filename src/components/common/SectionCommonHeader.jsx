import { Link } from "react-router-dom";
import sectionHeroImg from "../../assets/images/section-common-hero.webp";

export const SectionCommonHeader = ({ name, prev, curr }) => {
  return (
    <div className="relative">
      <img
        src={sectionHeroImg}
        alt=""
        className="object-center object-cover w-full h-[316px] blur-[3px] opacity-70"
      />
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <h3 className="mb-5 text-2xl font-semibold xsm:text-4xl md:text-5xl">
          {name}
        </h3>
        <div className="flex items-center justify-center gap-3">
          <span className="text-xs font-semibold xsm:text-sm">
            <Link to="/">{prev}</Link>
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={8}
            height={14}
            viewBox="0 0 8 14"
            fill="none"
          >
            <path d="M0 12l5-5-5-5 1-2 7 7-7 7-1-2z" fill="#000" />
          </svg>
          <span className="text-[#1e1e25] text-xs xsm:text-sm">{curr}</span>
        </div>
      </div>
    </div>
  );
};
