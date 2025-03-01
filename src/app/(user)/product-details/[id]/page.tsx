"use client";

import StoreProvider from "@/store/StoreProvider";
import ProductDetails from "@/ui/product/ProductDetails";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductType } from "@/lib/definitions";
import { InfoHighlights } from "@/ui/common/InfoHighlights";
import { fetchProduct } from "@/actions";

const ProductDetailsPage = () => {
  const [product, setProduct] = useState<ProductType>({
    id: "",
    name: "",
    description: "",
    sku: "",
    categories: [],
    tags: [],
    reviews: [],
    hasDiscount: undefined,
    sizes: [],
    colors: [],
    images: [],
    price: 0,
    updatedAt: undefined,
  });

  const params = useParams();
  const productId = params.id;

  useEffect(() => {
    const fetchData = async () => {
      if (typeof productId === "string") {
        const product = await fetchProduct(productId);
        setProduct(product);
      }
    };

    fetchData();
  }, [productId]);

  return (
    <>
      <StoreProvider>
        <ProductDetails singleProduct={product} />
      </StoreProvider>
      <InfoHighlights />
    </>
  );
};

export default ProductDetailsPage;
