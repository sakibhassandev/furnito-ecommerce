import { productLists } from "../../productLists";
import { Product } from "./Product";
console.log(productLists);

export const ProductList = () => {
  return (
    <div className="flex flex-wrap justify-between gap-10 mt-10 productContainer">
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
