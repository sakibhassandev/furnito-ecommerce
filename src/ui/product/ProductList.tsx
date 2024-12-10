import { ProductType } from "@/lib/definitions";
import { Product } from "./Product";
import axios from "axios";
import { useEffect, useState } from "react";
import { QuickView } from "./QuickView";
import { TopBar } from "../shop/TopBar";
import { Pagination } from "../shop/Pagination";
import { SortOption, sortProducts } from "@/utils/ProductSorting";

const ITEMS_PER_PAGE = 12;

export const ProductList = () => {
  const [productLists, setProductLists] = useState<ProductType[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<ProductType | null>(
    null
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [currentSort, setCurrentSort] =
    useState<SortOption["value"]>("featured");

  const sortedProducts = sortProducts(productLists, currentSort);
  const totalPages = Math.ceil(productLists.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const handleSortChange = (sort: SortOption["value"]) => {
    setCurrentSort(sort);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

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

  return (
    <>
      <TopBar
        totalItems={productLists.length}
        currentPage={currentPage}
        startIndex={startIndex + 1}
        endIndex={Math.min(endIndex, sortedProducts.length)}
        onSortChange={handleSortChange}
        currentSort={currentSort}
      />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] max-sm:justify-items-center gap-10 mt-10 productContainer">
        <QuickView quickViewProduct={quickViewProduct} />
        {currentProducts.map((product) => {
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};
