import { ProductType } from "@/lib/definitions";

const SizeSelector = ({
  sizesRef,
  Product,
  setSizesIndex,
}: {
  sizesRef: React.RefObject<HTMLDivElement>;
  Product: ProductType;
  setSizesIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="mb-4 sizes">
      <p className="text-[#9F9F9F] text-sm mb-3">Size</p>
      <div
        className="flex items-center gap-4"
        ref={sizesRef as unknown as React.RefObject<HTMLDivElement>}
      >
        {Product?.sizes?.map((size, i) => {
          return (
            <span
              onClick={() => {
                setSizesIndex(i);
                const sizesChildren = sizesRef.current?.children;
                if (sizesChildren) {
                  for (let i = 0; i < sizesChildren.length; i++) {
                    sizesChildren[i].classList.remove("sizes-active");
                  }
                  sizesChildren[i].classList.add("sizes-active");
                }
              }}
              key={i}
              className="capitalize bg-[#F9F1E7] py-2 px-3 flex justify-center text-sm items-center text-black rounded-md cursor-pointer"
            >
              {size}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default SizeSelector;
