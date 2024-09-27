import featureImg1 from "../../assets/images/feature-section/feature-img1.png";
import featureImg2 from "../../assets/images/feature-section/feature-img2.png";
import featureImg3 from "../../assets/images/feature-section/feature-img3.png";
import featureImg4 from "../../assets/images/feature-section/feature-img4.png";
import featureImg5 from "../../assets/images/feature-section/feature-img5.png";
import featureImg6 from "../../assets/images/feature-section/feature-img6.png";
import featureImg7 from "../../assets/images/feature-section/feature-img7.png";
import featureImg8 from "../../assets/images/feature-section/feature-img8.png";
import featureImg9 from "../../assets/images/feature-section/feature-img9.png";

export const Feature = () => {
  return (
    <section className="max-w-[1920px] mx-auto my-14">
      <div className="mb-6 text-center">
        <p className="text-[#616161] text-sm xsm:text-lg font-semibold">
          Share your setup with
        </p>
        <h3 className="text-[#3A3A3A] text-2xl xsm:text-4xl mt-2 font-bold">
          #FurnitoFurniture
        </h3>
      </div>

      <div className="flex justify-center gap-5 overflow-hidden max-md:items-center max-md:flex-col">
        <div className="flex flex-col gap-5 overflow-hidden">
          <div className="flex gap-5">
            <img src={featureImg1} alt="" className="object-contain" />
            <img src={featureImg2} alt="" className="self-end object-contain" />
          </div>
          <div className="flex gap-5">
            <img src={featureImg4} alt="" />
            <img
              src={featureImg3}
              alt=""
              className="self-start object-contain"
            />
          </div>
        </div>

        <div className="self-center max-w-full">
          <img src={featureImg5} alt="" />
        </div>

        <div className="flex flex-col gap-5 overflow-hidden">
          <div className="flex gap-5">
            <img src={featureImg6} alt="" className="self-end object-contain" />
            <img
              src={featureImg7}
              alt=""
              className="self-start object-contain"
            />
          </div>
          <div className="flex gap-5">
            <img
              src={featureImg8}
              alt=""
              className="self-start object-contain"
            />
            <img
              src={featureImg9}
              alt=""
              className="self-start object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
