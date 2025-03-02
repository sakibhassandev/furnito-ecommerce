import { useEffect, useState } from "react";
import { Product } from "../product/Product";
import { QuickView } from "@/ui/product/QuickView";
import { ProductType } from "@/lib/definitions";
import ProductSkeleton from "../skeleton/ProductSkeleton";
import { fetchProducts } from "@/actions";

export const HomePageProducts = () => {
  const [productLists, setProductLists] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await fetchProducts();
        setProductLists(products);
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
    <>
      {productLists.length === 0 ? (
        <ProductSkeleton count={8} />
      ) : (
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
                  sizes={product.sizes}
                  colors={product.colors}
                />
              );
            }
          })}
        </div>
      )}
    </>
  );
};
