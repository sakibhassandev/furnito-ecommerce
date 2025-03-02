import Image from "next/image";
import { Dispatch, SetStateAction, useEffect } from "react";

interface ImageGalleryProps {
  images: { url: string[] }[] | undefined;
  colorIndex: number;
  imgIndex: number;
  setImgIndex: Dispatch<SetStateAction<number>>;
  imagesRef: React.RefObject<HTMLDivElement>;
  imageContainerClass: string;
}

const ImageGallery = ({
  images,
  colorIndex,
  imgIndex,
  setImgIndex,
  imagesRef,
  imageContainerClass,
}: ImageGalleryProps) => {
  useEffect(() => {
    if (imagesRef.current) {
      for (let i = 0; i < imagesRef.current.children.length; i++) {
        imagesRef.current.children[i].classList.add(
          "after:invisible",
          "after:opacity-0"
        );
      }
      imagesRef.current.children[imgIndex]?.classList.remove(
        "after:invisible",
        "after:opacity-0"
      );
    }
  }, [imgIndex, imagesRef]);

  return (
    <div className="product-img">
      <div className={imageContainerClass}>
        {images && images[colorIndex]?.url[imgIndex] && (
          <Image
            src={images[colorIndex].url[imgIndex]}
            alt="cover-image"
            width={1920}
            height={1080}
            className="object-fill w-full min-h-full shadow-[0px_0px_8px_-3px_rgba(0,0,0,0.4)]"
          />
        )}
      </div>
      <div
        className="flex flex-wrap justify-between gap-3 product-options"
        ref={imagesRef}
      >
        {images &&
          images[colorIndex]?.url.map((url, i) => (
            <button
              onClick={() => setImgIndex(i)}
              className={`after:content-[''] after:ease-linear after:duration-300 after:absolute after:w-full after:h-full after:left-0 after:top-0 after:bg-transparent after:border after:border-[#B88E2F] relative w-24 h-24 mt-4 mb-3 sm:w-32 sm:h-32 lg:w-28 lg:h-28`}
              key={i}
            >
              <Image
                src={url}
                alt={`image-${i}`}
                width={1200}
                height={900}
                className="w-full h-full object-contain shadow-[0px_0px_8px_-3px_rgba(0,0,0,0.4)] p-2"
              />
            </button>
          ))}
      </div>
    </div>
  );
};

export default ImageGallery;
