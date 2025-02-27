"use client";

import React, { useState } from "react";
import { ArrowLeft, Plus, Upload, X } from "lucide-react";
import { deleteFromCloudinary, uploadToCloudinary } from "@/lib/cloudinary";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ImageFile {
  preview: string;
  publicId?: string;
}

const AdminAddProduct = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [colors, setColors] = useState<string[]>([]);
  const [newColorName, setNewColorName] = useState("");
  const [colorSwatches, setColorSwatches] = useState<{
    [key: string]: ImageFile;
  }>({});
  const [colorImages, setColorImages] = useState<{
    [key: string]: ImageFile[];
  }>({});
  const [dragActive, setDragActive] = useState(false);
  const router = useRouter();

  const addNewColor = () => {
    if (!newColorName.trim()) return;

    // Check if color already exists
    if (colors.includes(newColorName.trim())) {
      toast.error("Color already exists");
      return;
    }

    setColors((prev) => [...prev, newColorName.trim()]);
    setColorImages((prev) => ({
      ...prev,
      [newColorName.trim()]: [],
    }));
    setNewColorName("");
  };

  const removeColor = (colorName: string) => {
    if (
      window.confirm(
        `Are you sure you want to remove ${colorName} and all its images?`
      )
    ) {
      // Remove color from colors array
      setColors((prev) => prev.filter((color) => color !== colorName));

      // Remove color swatch if exists
      if (colorSwatches[colorName]) {
        const newSwatches = { ...colorSwatches };
        delete newSwatches[colorName];
        setColorSwatches(newSwatches);
      }

      // Remove color images if exist
      if (colorImages[colorName]) {
        const newImages = { ...colorImages };
        delete newImages[colorName];
        setColorImages(newImages);
      }

      // Reset selected color if it was the one removed
      if (selectedColor === colorName) {
        setSelectedColor("");
      }
    }
  };

  const uploadSwatchImage = async (file: File, colorName: string) => {
    setIsUploading(true);
    try {
      const result = await uploadToCloudinary(file);
      setColorSwatches((prev) => ({
        ...prev,
        [colorName]: {
          preview: result.secure_url,
          publicId: result.public_id,
        },
      }));
      if (result.secure_url) {
        toast.success("Swatch image uploaded successfully");
      } else {
        toast.error("Error uploading swatch image");
      }
    } catch (error) {
      console.error("Error uploading swatch image:", error);
      toast.error("Error uploading swatch image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSwatchImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    colorName: string
  ) => {
    if (e.target.files && e.target.files[0]) {
      await uploadSwatchImage(e.target.files[0], colorName);
    }
  };

  const removeSwatchImage = async (colorName: string) => {
    const swatchImage = colorSwatches[colorName];
    if (swatchImage?.publicId) {
      try {
        const response = await deleteFromCloudinary(swatchImage.publicId);
        if (response.result === "ok") {
          toast.success("Swatch image deleted successfully");
        } else {
          toast.error("Error deleting swatch image");
        }
      } catch (error) {
        toast.error("Error deleting swatch image");
        console.error("Error deleting swatch image:", error);
        return;
      }
    }

    const newSwatches = { ...colorSwatches };
    delete newSwatches[colorName];
    setColorSwatches(newSwatches);
  };

  const handleProductImageUpload = async (files: File[], colorName: string) => {
    if (!colorName) return;

    setIsUploading(true);
    try {
      const currentImages = colorImages[colorName] || [];
      const uploadPromises = files.map(async (file) => {
        const result = await uploadToCloudinary(file);
        return {
          preview: result.secure_url,
          publicId: result.public_id,
        };
      });

      const uploadedImages = await Promise.all(uploadPromises);

      setColorImages((prev) => ({
        ...prev,
        [colorName]: [...(prev[colorName] || []), ...uploadedImages].slice(
          0,
          4
        ),
      }));
    } catch (error) {
      console.error("Error uploading product images:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleProductImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && selectedColor) {
      const currentImages = colorImages[selectedColor] || [];
      const filesArray = Array.from(e.target.files).slice(
        0,
        4 - currentImages.length
      );
      await handleProductImageUpload(filesArray, selectedColor);
    }
  };

  const removeProductImage = async (colorName: string, index: number) => {
    const images = colorImages[colorName];
    if (!images || index >= images.length) return;

    const image = images[index];
    if (image.publicId) {
      try {
        await deleteFromCloudinary(image.publicId);
      } catch (error) {
        console.error("Error deleting product image:", error);
        return;
      }
    }

    setColorImages((prev) => ({
      ...prev,
      [colorName]: prev[colorName].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const productData = {
      name: formData.get("name"),
      sku: formData.get("sku"),
      description: formData.get("description"),
      price: parseFloat(formData.get("price") as string),
      discount: parseInt(formData.get("discount") as string),
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
      colors: colors.map((colorName) => ({
        name: colorName,
        colorImage: colorSwatches[colorName]
          ? {
              url: colorSwatches[colorName].preview,
              publicId: colorSwatches[colorName].publicId,
            }
          : null,
        images: (colorImages[colorName] || []).map((img) => ({
          url: img.preview,
          publicId: img.publicId,
        })),
      })),
    };

    console.log(productData);

    // Send product data to the server
    const { data } = await axios.post("/api/product", { productData });
    if (data.success) {
      toast.success("Product created successfully");
      router.push("/admin/products");
    } else {
      toast.error("Error creating product");
    }
  };

  const getRemainingSlots = (colorName: string) => {
    const images = colorImages[colorName] || [];
    return 4 - images.length;
  };

  const handleAddImageClick = (colorName: string) => {
    setSelectedColor(colorName);
    // Focus on the file input after a short delay to allow state update
    setTimeout(() => {
      const fileInput = document.getElementById("product-images");
      if (fileInput) {
        fileInput.click();
      }
    }, 100);
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

          <div className="md:col-span-2">
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

          <div className="md:col-span-2">
            <label className="block text-lg font-medium text-gray-700 mb-4">
              Product Colors and Images
            </label>

            {/* Add new color */}
            <div className="mb-6 p-4 border border-dashed border-gray-300 rounded-lg">
              <h3 className="text-md font-medium mb-3">Add New Color</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newColorName}
                  onChange={(e) => setNewColorName(e.target.value)}
                  placeholder="Enter color name"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
                />
                <button
                  type="button"
                  onClick={addNewColor}
                  className="bg-[#B88E2F] text-white px-4 py-2 rounded-lg hover:bg-[#96732B] flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </button>
              </div>
            </div>

            {/* Color selection for product images */}
            <div className="mb-4">
              <label className="block text-md font-medium text-gray-700 mb-2">
                Select Color for Product Images
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

            {/* Product image upload area */}
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
                      htmlFor="product-images"
                      className={`relative cursor-pointer bg-white rounded-md font-medium text-[#B88E2F] hover:text-[#96732B] focus-within:outline-none ${
                        isUploading ? "pointer-events-none" : ""
                      }`}
                    >
                      <span>Upload product images for {selectedColor}</span>
                      <input
                        id="product-images"
                        name="product-images"
                        type="file"
                        multiple
                        accept="image/*"
                        className="sr-only"
                        onChange={handleProductImageChange}
                        disabled={isUploading}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB each
                  </p>
                  <p className="text-xs text-gray-500">
                    {getRemainingSlots(selectedColor)} slots remaining for{" "}
                    {selectedColor}
                  </p>
                  {isUploading && (
                    <p className="text-sm text-[#B88E2F]">Uploading...</p>
                  )}
                </div>
              </div>
            )}

            {/* Color swatches and product images */}
            <div className="mt-8 space-y-8">
              {colors.map((colorName) => (
                <div
                  key={colorName}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">{colorName}</h3>
                    <button
                      type="button"
                      onClick={() => removeColor(colorName)}
                      className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded-full"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Color swatch image */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color Swatch Image
                    </label>
                    <div className="flex items-center gap-4">
                      {colorSwatches[colorName] ? (
                        <div className="relative group">
                          <Image
                            src={colorSwatches[colorName].preview}
                            alt={`${colorName} swatch`}
                            width={1920}
                            height={1080}
                            className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => removeSwatchImage(colorName)}
                            disabled={isUploading}
                            className="absolute -top-2 -right-2 p-1.5 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                          <label
                            htmlFor={`swatch-${colorName}`}
                            className="cursor-pointer text-gray-500 hover:text-[#B88E2F] flex flex-col items-center"
                          >
                            <Plus className="w-6 h-6" />
                            <span className="text-xs mt-1">Add</span>
                            <input
                              id={`swatch-${colorName}`}
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={(e) =>
                                handleSwatchImageChange(e, colorName)
                              }
                              disabled={isUploading}
                            />
                          </label>
                        </div>
                      )}
                      <div className="text-sm text-gray-600">
                        {colorSwatches[colorName] ? (
                          <p>Swatch image uploaded</p>
                        ) : (
                          <p>Upload a swatch image for this color</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Product images */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Images ({(colorImages[colorName] || []).length}/4)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {(colorImages[colorName] || []).map((image, index) => (
                        <div
                          key={index}
                          className="relative group aspect-square"
                        >
                          <Image
                            src={image.preview}
                            alt={`${colorName} product ${index + 1}`}
                            width={1920}
                            height={1080}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeProductImage(colorName, index)}
                            disabled={isUploading}
                            className="absolute -top-2 -right-2 p-1.5 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      {(colorImages[colorName] || []).length < 4 && (
                        <button
                          type="button"
                          onClick={() => handleAddImageClick(colorName)}
                          className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:text-[#B88E2F] hover:border-[#B88E2F]"
                        >
                          <Plus className="w-8 h-8" />
                          <span className="text-sm mt-1">Add Image</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
