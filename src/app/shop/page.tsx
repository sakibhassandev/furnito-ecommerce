"use client";

import StoreProvider from "@/store/StoreProvider";
import { InfoHighlights } from "@/ui/common/InfoHighlights";
import { SectionCommonHeader } from "@/ui/common/SectionCommonHeader";
import { ProductList } from "@/ui/product/ProductList";
import { Pagination } from "@/ui/shop/Pagination";
import { TopBar } from "@/ui/shop/TopBar";
// import { Metadata } from "next";
import { useState } from "react";

// export const metadata: Metadata = {
//   title: "Shop",
// };

const Shop = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  return (
    <section className="shop-container">
      <SectionCommonHeader name="Shop" curr="Shop" prev="Home" />
      <div className="mx-4 xsm:mx-8 products-container max-w-screen-xl xl:mx-auto">
        <TopBar
          viewMode={viewMode}
          onViewChange={setViewMode}
          totalItems={10}
        />
        <StoreProvider>
          <ProductList /> {/*products list */}
        </StoreProvider>
        <Pagination
          currentPage={1}
          totalPages={3}
          onPageChange={(page) => page}
        />
      </div>
      <div className="mt-20">
        <InfoHighlights />
      </div>
    </section>
  );
};

export default Shop;
