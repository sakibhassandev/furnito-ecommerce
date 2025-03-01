import Image from "next/image";
import { Upload, X, Plus } from "lucide-react";
import { useState } from "react";
import {
  addNewColor,
  removeColor,
  uploadSwatchImage,
  removeSwatchImage,
  handleProductImageUpload,
  removeProductImage,
} from "@/utils/productUtils";
import { ImageFile, ProductType } from "@/lib/definitions";

interface AdminProductColorImageProps {
  colors: string[];
  setColors: React.Dispatch<React.SetStateAction<string[]>>;
  colorSwatches: { [key: string]: ImageFile };
  setColorSwatches: React.Dispatch<
    React.SetStateAction<{ [key: string]: ImageFile }>
  >;
  colorImages: { [key: string]: ImageFile[] };
  setColorImages: React.Dispatch<
    React.SetStateAction<{ [key: string]: ImageFile[] }>
  >;
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
  isUploading: boolean;
  product?: ProductType;
}

const AdminAddEditProductDetail = ({
  colorImages,
  colorSwatches,
  isUploading,
  setColorImages,
  setColorSwatches,
  colors,
  selectedColor,
  setSelectedColor,
  setIsUploading,
  product,
  setColors,
}: AdminProductColorImageProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Name
        </label>
        <input
          type="text"
          name="name"
          defaultValue={product?.name}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          SKU
        </label>
        <input
          name="sku"
          type="text"
          defaultValue={product?.sku}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          rows={4}
          name="description"
          defaultValue={product?.description}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price
        </label>
        <input
          type="number"
          name="price"
          step="0.01"
          defaultValue={product?.price}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Discount (%)
        </label>
        <input
          type="number"
          name="discount"
          defaultValue={product?.hasDiscount}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categories
        </label>
        <input
          type="text"
          name="categories"
          defaultValue={product?.categories?.join(", ")}
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
          name="tags"
          defaultValue={product?.tags?.join(", ")}
          placeholder="Separate with commas"
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
          defaultValue={product?.sizes?.join(", ")}
          name="sizes"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
        />
      </div>

      {/* Product Colors and Images Component */}
      <AdminProductColorImage
        colors={colors}
        colorImages={colorImages}
        colorSwatches={colorSwatches}
        isUploading={isUploading}
        selectedColor={selectedColor}
        setColorImages={setColorImages}
        setColorSwatches={setColorSwatches}
        setColors={setColors}
        setSelectedColor={setSelectedColor}
        setIsUploading={setIsUploading}
      />
    </div>
  );
};

const AdminProductColorImage = ({
  colors,
  setColors,
  colorSwatches,
  setColorSwatches,
  colorImages,
  setColorImages,
  selectedColor,
  setSelectedColor,
  setIsUploading,
  isUploading,
}: AdminProductColorImageProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [newColorName, setNewColorName] = useState("");

  const handleAddNewColor = () => {
    addNewColor(newColorName, colors, setColors, setColorImages);
    setNewColorName("");
  };

  const handleRemoveColor = (colorName: string) => {
    removeColor(
      colorName,
      setColors,
      colorSwatches,
      setColorSwatches,
      colorImages,
      setColorImages,
      selectedColor,
      setSelectedColor
    );
  };

  const handleRemoveProductImage = async (colorName: string, index: number) => {
    await removeProductImage(colorName, index, colorImages, setColorImages);
  };

  const handleSwatchImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    colorName: string
  ) => {
    if (e.target.files && e.target.files[0]) {
      await handleUploadSwatchImage(e.target.files[0], colorName);
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
      await handleUploadProductImages(filesArray, selectedColor);
    }
  };

  const handleUploadProductImages = async (
    files: File[],
    colorName: string
  ) => {
    await handleProductImageUpload(
      files,
      colorName,
      setColorImages,
      setIsUploading
    );
  };

  const handleUploadSwatchImage = async (file: File, colorName: string) => {
    await uploadSwatchImage(file, colorName, setColorSwatches, setIsUploading);
  };

  const handleRemoveSwatchImage = async (colorName: string) => {
    await removeSwatchImage(
      colorName,
      colorSwatches,
      setColorSwatches,
      setIsUploading
    );
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
      await handleUploadProductImages(files, selectedColor);
    }
  };

  return (
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
            onClick={handleAddNewColor}
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
                onClick={() => handleRemoveColor(colorName)}
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
                      src={colorSwatches[colorName].preview.toString()}
                      alt={`${colorName} swatch`}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                      width={1920}
                      height={1080}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSwatchImage(colorName)}
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
                        onChange={(e) => handleSwatchImageChange(e, colorName)}
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
                  <div key={index} className="relative group aspect-square">
                    <Image
                      src={image.preview.toString()}
                      alt={`${colorName} product ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                      width={1920}
                      height={1080}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveProductImage(colorName, index)}
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
  );
};

export default AdminAddEditProductDetail;
