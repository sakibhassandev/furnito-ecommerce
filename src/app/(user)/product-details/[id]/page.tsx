"use client";

import StoreProvider from "@/store/StoreProvider";
import ProductDetails from "@/ui/product/ProductDetails";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { ApiError } from "@/utils/ApiError";
import { toast } from "react-toastify";
import { ProductType } from "@/lib/definitions";
import { InfoHighlights } from "@/ui/common/InfoHighlights";

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
      try {
        const response = await axios.get(`/api/product?productId=${productId}`);
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
