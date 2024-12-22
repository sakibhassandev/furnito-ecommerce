"use client";

import StoreProvider from "@/store/StoreProvider";
import ProductDetails from "@/ui/product/ProductDetails";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { ApiError } from "@/utils/ApiError";
import { toast } from "react-toastify";
import { ProductType } from "@/lib/definitions";

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

  console.log(productId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/api/get-product?productId=" + productId
        );
        setProduct(response.data.data);
      } catch (error) {
        const axiosError = error as AxiosError<ApiError>;
        toast.error(
          axiosError.response?.data.message || "Something went wrong",
          {
            position: "top-center",
            autoClose: 2000,
            theme: "light",
          }
        );
      }
    };

    fetchData();
  }, [productId]);

  console.log(product);

  return (
    <div>
      <StoreProvider>
        <ProductDetails quickViewProduct={product} />
      </StoreProvider>
    </div>
  );
};

export default ProductDetailsPage;
