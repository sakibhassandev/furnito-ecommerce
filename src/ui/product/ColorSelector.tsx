import { ProductType } from "@/lib/definitions";
import Image from "next/image";

const ColorSelector = ({
  colorsRef,
  Product,
  setColorIndex,
}: {
  colorsRef: React.RefObject<HTMLDivElement>;
  Product: ProductType;
  setColorIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="mb-4 colors">
      <p className="text-[#9F9F9F] text-sm mb-3">Color</p>
      <div
        className="flex items-center gap-3"
        ref={colorsRef as unknown as React.RefObject<HTMLDivElement>}
      >
        {Product?.colors?.map((color, i) => {
          return (
            <Image
              onClick={() => {
                setColorIndex(i);
                const colorChildren = colorsRef.current?.children;
                if (colorChildren) {
                  for (let i = 0; i < colorChildren.length; i++) {
                    colorChildren[i].classList.remove(
                      "border",
                      "animate-[swatch-pulse_1.2s_ease-in-out_infinite_alternate]"
                    );
                  }
                  colorChildren[i].classList.add(
                    "border",
                    "animate-[swatch-pulse_1.2s_ease-in-out_infinite_alternate]"
                  );
                }
              }}
              key={i}
              src={color.image}
              alt={color.name}
              width={1200}
              height={900}
              title={`Select Color: ${color.name}`}
              className="relative w-[1.75rem] shadow-[0px_0px_8px_-3px_rgba(0,0,0,0.4)] animate-[swatch-pulse_1.2s_ease-in-out_infinite_alternate] h-[1.75rem] p-[2px] border border-[#B88E2F] rounded-full cursor-pointer"
            />
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;
