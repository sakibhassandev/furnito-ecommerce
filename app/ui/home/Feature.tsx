import Image from "next/image";

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
            <Image
              src="/assets/images/feature-section/feature-img1.webp"
              alt="feature-img1"
              className="object-contain"
              width={78}
              height={382}
            />
            <Image
              src="/assets/images/feature-section/feature-img2.webp"
              alt="feature-img2"
              className="self-end object-contain"
              width={451}
              height={312}
            />
          </div>
          <div className="flex gap-5">
            <Image
              src="/assets/images/feature-section/feature-img4.webp"
              alt="feature-img4"
              width={185}
              height={323}
            />
            <Image
              src="/assets/images/feature-section/feature-img3.webp"
              alt="feature-img3"
              className="self-start object-contain"
              width={344}
              height={242}
            />
          </div>
        </div>

        <div className="self-center max-w-full">
          <Image
            src="/assets/images/feature-section/feature-img5.webp"
            alt="feature-img5"
            width={295}
            height={392}
          />
        </div>

        <div className="flex flex-col gap-5 overflow-hidden">
          <div className="flex gap-5">
            <Image
              src="/assets/images/feature-section/feature-img6.webp"
              alt="feature-img6"
              className="self-end object-contain"
              width={290}
              height={348}
            />
            <Image
              src="/assets/images/feature-section/feature-img7.webp"
              alt="feature-img7"
              className="self-start object-contain"
              width={262}
              height={433}
            />
          </div>
          <div className="flex gap-5">
            <Image
              src="/assets/images/feature-section/feature-img8.webp"
              alt="feature-img8"
              className="self-start object-contain"
              width={178}
              height={242}
            />
            <Image
              src="/assets/images/feature-section/feature-img9.webp"
              alt="feature-img9"
              className="self-start object-contain"
              width={258}
              height={196}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
