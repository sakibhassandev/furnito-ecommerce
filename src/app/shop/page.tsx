"use client";

import StoreProvider from "@/store/StoreProvider";
import { InfoHighlights } from "@/ui/common/InfoHighlights";
import { SectionCommonHeader } from "@/ui/common/SectionCommonHeader";
import { ProductList } from "@/ui/product/ProductList";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Shop",
// };

const Shop = () => {
  return (
    <section className="shop-container">
      <SectionCommonHeader name="Shop" curr="Shop" prev="Home" />
      <div className="mx-4 xsm:mx-8 products-container max-w-screen-xl xl:mx-auto">
        <StoreProvider>
          <ProductList /> {/*products list */}
        </StoreProvider>
      </div>
      <div className="mt-20">
        <InfoHighlights />
      </div>
    </section>
  );
};

export default Shop;
