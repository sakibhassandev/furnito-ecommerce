import { productLists } from "../../../productLists";
import { Product } from "./Product";

export const ProductList = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] max-sm:justify-items-center gap-10 mt-10 productContainer">
      {productLists.map((product) => {
        return (
          <Product
            key={product.id}
            name={product.name}
            img={Object.values(product.images)[0][0]}
            price={product.price}
            discountPrice={product.discountPrice}
            hasOffer={product.hasOffer}
          />
        );
      })}
    </div>
  );
};
