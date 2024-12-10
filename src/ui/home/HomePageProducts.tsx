import { useEffect, useState } from "react";
import { Product } from "../product/Product";
import { QuickView } from "@/ui/product/QuickView";
import { ProductType } from "@/lib/definitions";
import axios from "axios";

export const HomePageProducts = () => {
  const [productLists, setProductLists] = useState<ProductType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/get-products", {
          page: 1,
        });
        setProductLists(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [quickViewProduct, setQuickViewProduct] = useState<ProductType | null>(
    null
  );

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] max-sm:justify-items-center gap-12 sm:gap-10 mt-10 productContainer">
      <QuickView quickViewProduct={quickViewProduct} />
      {productLists.map((product, i: number) => {
        if (i >= 8) {
          return null;
        } else {
          return (
            <Product
              setQuickViewProduct={setQuickViewProduct}
              productLists={productLists}
              key={product.id}
              id={product.id}
              name={product.name}
              img={product.images[0]?.url[0]}
              price={product.price}
              hasDiscount={product.hasDiscount || 0}
            />
          );
        }
      })}
    </div>
  );
};
