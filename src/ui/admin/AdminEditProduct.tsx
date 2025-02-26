import React, { useState } from "react";
import { Upload, ArrowLeft, X } from "lucide-react";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";
import Link from "next/link";
import Image from "next/image";

interface ImageFile {
  file?: File;
  preview: string;
  publicId?: string;
}

const AdminEditProduct = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState<ImageFile[]>([
    {
      preview:
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=300&q=80",
      publicId: "existing-image-1",
    },
    {
      preview:
        "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=300&q=80",
      publicId: "existing-image-2",
    },
    {
      preview:
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=300&q=80",
      publicId: "existing-image-3",
    },
    {
      preview:
        "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=300&q=80",
      publicId: "existing-image-4",
    },
  ]);
  const [dragActive, setDragActive] = useState(false);

  const handleImageUpload = async (files: File[]) => {
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
      setImages((prev) => [...prev, ...uploadedImages].slice(0, 4));
    } catch (error) {
      console.error("Error uploading images:", error);
      // Handle error (show notification, etc.)
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 4 - images.length);
      await handleImageUpload(filesArray);
    }
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

    const files = Array.from(e.dataTransfer.files)
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, 4 - images.length);

    if (files.length > 0) {
      await handleImageUpload(files);
    }
  };

  const removeImage = async (index: number) => {
    const image = images[index];
    if (image.publicId) {
      try {
        await deleteFromCloudinary(image.publicId);
      } catch (error) {
        console.error("Error deleting image:", error);
        return; // Don't remove from UI if delete failed
      }
    }
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission with uploaded image URLs
    const imageUrls = images.map((img) => ({
      url: img.preview,
      publicId: img.publicId,
    }));
    // Submit to your API...
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
        <h1 className="text-3xl font-bold">Edit Product</h1>
      </div>

      <form className="bg-white rounded-lg shadow p-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              defaultValue="Modern Chair"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SKU
            </label>
            <input
              type="text"
              defaultValue="CHR-001"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              defaultValue="A modern chair with a sleek design and comfortable seating."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              defaultValue="299.00"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount (%)
            </label>
            <input
              type="number"
              defaultValue="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categories
            </label>
            <input
              type="text"
              defaultValue="Furniture, Chairs, Living Room"
              placeholder="Separate with commas"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              defaultValue="modern, comfortable, stylish"
              placeholder="Separate with commas"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sizes
            </label>
            <input
              type="text"
              defaultValue="Small, Medium, Large"
              placeholder="Separate with commas"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Colors
            </label>
            <input
              type="text"
              defaultValue="Black, White, Brown"
              placeholder="Separate with commas"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images (Maximum 4)
            </label>
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
                    <span>Upload images</span>
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
                  {4 - images.length} slots remaining
                </p>
                {isUploading && (
                  <p className="text-sm text-[#B88E2F]">Uploading...</p>
                )}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group aspect-square">
                  <Image
                    src={image.preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                    width={300}
                    height={300}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    disabled={isUploading}
                    className="absolute -top-2 -right-2 p-1.5 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="w-4 h-4" />
                  </button>
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

export default AdminEditProduct;
