"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ImageFile, ProductType } from "@/lib/definitions";
import AdminAddEditProductDetail from "./AdminProductColorImage";
import { handleSubmitProductData } from "@/utils/productUtils";
import { fetchProduct } from "@/actions";

const AdminEditProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState<ProductType>({} as ProductType);

  const [isUploading, setIsUploading] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [colors, setColors] = useState<string[]>([]);
  const [colorSwatches, setColorSwatches] = useState<{
    [key: string]: ImageFile;
  }>({});
  const [colorImages, setColorImages] = useState<{
    [key: string]: ImageFile[];
  }>({});

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProduct = await fetchProduct(params.id as string);
      setProduct(fetchedProduct);

      // Process color data
      const colorNames = fetchedProduct.colors.map(
        (color: { name: string; publicId: string; image: string }) => color.name
      );
      setColors(colorNames);

      // Process color swatches
      const swatches: { [key: string]: ImageFile } = {};
      fetchedProduct.colors.forEach(
        (color: { name: string; publicId: string; image: string }) => {
          swatches[color.name] = {
            preview: color.image,
            publicId: color.publicId,
          };
        }
      );
      setColorSwatches(swatches);

      // Process product images
      const images: { [key: string]: ImageFile[] } = {};
      fetchedProduct.images.forEach(
        (imageData: {
          name: string;
          publicId: string;
          url: string[];
          color: string;
        }) => {
          const colorImages = imageData.url.map((url, index) => ({
            preview: url,
            publicId: imageData.publicId[index],
          }));
          images[imageData.color] = colorImages;
        }
      );
      setColorImages(images);

      // Set first color as selected if available
      if (colorNames.length > 0) {
        setSelectedColor(colorNames[0]);
      }
    };

    fetchProducts();
  }, [params.id]);

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/products"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <h1 className="text-3xl font-bold">Edit Product</h1>
      </div>

      <form
        className="bg-white rounded-lg shadow p-6"
        onSubmit={(e) =>
          handleSubmitProductData({
            type: "edit",
            e,
            router,
            colors,
            colorSwatches,
            colorImages,
            params: { id: params.id as string },
          })
        }
      >
        <AdminAddEditProductDetail
          colorImages={colorImages}
          colorSwatches={colorSwatches}
          isUploading={isUploading}
          setColorImages={setColorImages}
          setColorSwatches={setColorSwatches}
          colors={colors}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          setIsUploading={setIsUploading}
          product={product}
          setColors={setColors}
        />

        <div className="mt-6 flex justify-end space-x-4">
          <Link
            href="/admin/products"
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-[#B88E2F] text-white px-6 py-2 rounded-lg hover:bg-[#96732B] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isUploading}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditProduct;
