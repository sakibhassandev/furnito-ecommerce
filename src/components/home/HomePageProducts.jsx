import { useState } from "react";
import { useSelector } from "react-redux";
import { Product } from "../product/Product";
import { QuickView } from "../product/QuickView";

export const HomePageProducts = () => {
  const productLists = useSelector((state) => state.products);
  const [quickViewProduct, setQuickViewProduct] = useState([]);
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] max-sm:justify-items-center gap-12 sm:gap-10 mt-10 productContainer">
      <QuickView quickViewProduct={quickViewProduct} />
      {productLists.map((product, i) => {
        if (i >= 8) {
          return;
        } else {
          return (
            <Product
              setQuickViewProduct={setQuickViewProduct}
              productLists={productLists}
              key={product.id}
              id={product.id}
              name={product.name}
              img={Object.values(product.images)[0][0]}
              price={product.price}
              hasDiscount={product.hasDiscount}
            />
          );
        }
      })}
    </div>
  );
};
