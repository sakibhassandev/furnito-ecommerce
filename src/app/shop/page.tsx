"use client";

import { SectionCommonHeader } from "@/ui/common/SectionCommonHeader";
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
      <TopBar viewMode={viewMode} onViewChange={setViewMode} totalItems={10} />
    </section>
  );
};

export default Shop;
