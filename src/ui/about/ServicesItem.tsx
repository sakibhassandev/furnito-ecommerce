import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";

type ServiceItemProps = {
  icon: string;
  name: string;
  count: string;
};

type ServicesItemsProps = {
  servicesItems: ServiceItemProps[];
};

export const ServicesItem = ({ servicesItems }: ServicesItemsProps) => {
  return servicesItems.map((item, i) => (
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
  ));
};
