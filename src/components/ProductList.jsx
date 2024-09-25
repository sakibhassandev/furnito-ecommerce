import { productLists } from "../../productLists";
import { Product } from "./Product";
console.log(productLists);

export const ProductList = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] max-sm:justify-items-center gap-10 mt-10 productContainer">
      {productLists.map((product) => {
        console.log();
        return (
          <Product
            key={product.id}
            name={product.name}
            img={Object.values(product.images)[0][2]}
            title={product.title}
            price={product.price}
          />
        );
      })}
    </div>
  );
};
