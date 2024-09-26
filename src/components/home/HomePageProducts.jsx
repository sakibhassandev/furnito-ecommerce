import { productLists } from "../../../productLists";
import { Product } from "../product/Product";

export const HomePageProducts = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] max-sm:justify-items-center gap-12 sm:gap-10 mt-10 productContainer">
      {productLists.map((product, i) => {
        if (i >= 8) {
          return;
        } else {
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
        }
      })}
    </div>
  );
};
