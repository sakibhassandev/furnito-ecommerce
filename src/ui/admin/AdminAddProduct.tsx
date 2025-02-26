"use client";

import React, { useState } from "react";
import { ArrowLeft, Upload, X } from "lucide-react";
import { deleteFromCloudinary, uploadToCloudinary } from "@/lib/cloudinary";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

const AdminAddProduct = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [colors, setColors] = useState<string[]>([]);
  const [colorImages, setColorImages] = useState<{
    [key: string]: { preview: string; publicId: string }[];
  }>({});
  const [dragActive, setDragActive] = useState(false);

  const handleImageUpload = async (files: File[], color: string) => {
    if (!color) return;

    setIsUploading(true);
    try {
      const uploadPromises = files.map(async (file) => {
        const result = await uploadToCloudinary(file);
        return {
          file,
          preview: result.secure_url,
          publicId: result.public_id,
        };
      });

      const uploadedImages = await Promise.all(uploadPromises);
      setColorImages((prev) => ({
        ...prev,
        [color]: [
          ...(prev[color] || []),
          ...uploadedImages.map((img) => ({
            preview: img.preview,
            publicId: img.publicId,
          })),
        ].slice(0, 4),
      }));
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && selectedColor) {
      const currentImages = colorImages[selectedColor] || [];
      const filesArray = Array.from(e.target.files).slice(
        0,
        4 - currentImages.length
      );
      await handleImageUpload(filesArray, selectedColor);
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColors = e.target.value.split(",").map((c) => c.trim());
    setColors(newColors);

    // Initialize image arrays for new colors
    const newColorImages: {
      [key: string]: { preview: string; publicId: string }[];
    } = {};
    newColors.forEach((color) => {
      newColorImages[color] = colorImages[color] || [];
    });
    setColorImages(newColorImages);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get form data from event
    const formData = new FormData(e.currentTarget);
    const productData = {
      name: formData.get("name") as string,
      sku: formData.get("sku") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      discount: parseInt(formData.get("discount") as string) || 0,
      categories: formData
        .get("categories")
        ?.toString()
        .split(",")
        .map((c) => c.trim()),
      tags: formData
        .get("tags")
        ?.toString()
        .split(",")
        .map((t) => t.trim()),
      sizes: formData
        .get("sizes")
        ?.toString()
        .split(",")
        .map((s) => s.trim()),
      colors: colors,
      images: colorImages,
    };

    console.log("Product Data:", productData);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (!selectedColor) return;

    const currentImages = colorImages[selectedColor] || [];
    const files = Array.from(e.dataTransfer.files)
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, 4 - currentImages.length);

    if (files.length > 0) {
      await handleImageUpload(files, selectedColor);
    }
  };

  const removeImage = async (color: string, index: number) => {
    const image = colorImages[color][index];
    console.log(image);
    if (image.publicId) {
      try {
        await deleteFromCloudinary(image.publicId);
        toast.success("Image deleted successfully");
      } catch (error) {
        console.error("Error deleting image:", error);
        toast.error("Failed to delete image");
        return;
      }
    }
    setColorImages((prev) => ({
      ...prev,
      [color]: prev[color].filter((_, i) => i !== index),
    }));
  };

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

      <form className="bg-white rounded-lg shadow p-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
              name="name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SKU
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
              name="sku"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
              name="description"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
              name="price"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount (%)
            </label>
            <input
              type="number"
              defaultValue={0}
              min={0}
              max={99}
              name="discount"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categories
            </label>
            <input
              type="text"
              placeholder="Separate with commas"
              name="categories"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              placeholder="Separate with commas"
              name="tags"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sizes
            </label>
            <input
              type="text"
              placeholder="Separate with commas"
              name="sizes"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Colors
            </label>
            <input
              type="text"
              value={colors.join(", ")}
              name="colors"
              onChange={handleColorChange}
              placeholder="Separate with commas"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images by Color (Maximum 4 per color)
            </label>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Color for Upload
              </label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
              >
                <option value="">Select a color</option>
                {colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>

            {selectedColor && (
              <div
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors duration-200 ${
                  dragActive
                    ? "border-[#B88E2F] bg-[#B88E2F] bg-opacity-5"
                    : "border-gray-300"
                } ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="space-y-2 text-center">
                  <Upload
                    className={`mx-auto h-12 w-12 ${
                      dragActive ? "text-[#B88E2F]" : "text-gray-400"
                    }`}
                  />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="images"
                      className={`relative cursor-pointer bg-white rounded-md font-medium text-[#B88E2F] hover:text-[#96732B] focus-within:outline-none ${
                        isUploading ? "pointer-events-none" : ""
                      }`}
                    >
                      <span>Upload images for {selectedColor}</span>
                      <input
                        id="images"
                        name="images"
                        type="file"
                        multiple
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageChange}
                        disabled={isUploading}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB each
                  </p>
                  <p className="text-xs text-gray-500">
                    {4 - (colorImages[selectedColor]?.length || 0)} slots
                    remaining for {selectedColor}
                  </p>
                  {isUploading && (
                    <p className="text-sm text-[#B88E2F]">Uploading...</p>
                  )}
                </div>
              </div>
            )}

            {/* Images by color */}
            {colors.map((color) => (
              <div key={color} className="mt-6">
                <h3 className="text-lg font-medium mb-3">{color}</h3>
                <div className="flex gap-5">
                  {colorImages?.[color]?.map((image, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={image.preview}
                        alt={`${color} Preview ${index + 1}`}
                        className="w-32 h-32 object-cover rounded-lg"
                        width={1920}
                        height={1080}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(color, index)}
                        disabled={isUploading}
                        className="absolute -top-2 -right-2 p-1.5 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

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
