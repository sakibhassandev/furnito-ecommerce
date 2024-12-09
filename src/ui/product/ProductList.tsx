import { ProductType } from "@/lib/definitions";
import { Product } from "./Product";
import axios from "axios";
import { useEffect, useState } from "react";
import { QuickView } from "./QuickView";

export const ProductList = () => {
  const [productLists, setProductLists] = useState<ProductType[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<ProductType | null>(
    null
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/get-products", {
          page: 1,
        });
        console.log(response.data.data);
        setProductLists(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] max-sm:justify-items-center gap-10 mt-10 productContainer">
      <QuickView quickViewProduct={quickViewProduct} />
      {productLists.map((product) => {
        return (
          <Product
            productLists={productLists}
            setQuickViewProduct={setQuickViewProduct}
            id={product.id}
            key={product.id}
            name={product.name}
            img={product.images[0]?.url[0]}
            price={product.price}
            hasDiscount={product.hasDiscount}
          />
        );
      })}
    </div>
  );
};
