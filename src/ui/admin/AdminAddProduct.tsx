"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ImageFile } from "@/lib/definitions";
import AdminAddEditProductDetail from "./AdminProductColorImage";
import { handleSubmitProductData } from "@/utils/productUtils";

const AdminAddProduct = () => {
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

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/products"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <h1 className="text-3xl font-bold">Add Product</h1>
      </div>

      <form
        className="bg-white rounded-lg shadow p-6"
        onSubmit={(e) =>
          handleSubmitProductData({
            type: "create",
            e,
            router,
            colors,
            colorSwatches,
            colorImages,
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

export default AdminAddProduct;
