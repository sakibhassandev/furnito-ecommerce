import { deleteFromCloudinary, uploadToCloudinary } from "@/lib/cloudinary";
import { ImageFile } from "@/lib/definitions";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-toastify";

export const addNewColor = (
  newColorName: string,
  colors: string[],
  setColors: React.Dispatch<React.SetStateAction<string[]>>,
  setColorImages: React.Dispatch<
    React.SetStateAction<{ [key: string]: ImageFile[] }>
  >
) => {
  if (!newColorName.trim()) return;

  if (colors.includes(newColorName.trim())) {
    toast.error("Color already exists");
    return;
  }

  setColors((prev) => [...prev, newColorName.trim()]);
  setColorImages((prev) => ({
    ...prev,
    [newColorName.trim()]: [],
  }));
};

export const removeColor = async (
  colorName: string,
  setColors: React.Dispatch<React.SetStateAction<string[]>>,
  colorSwatches: { [key: string]: ImageFile },
  setColorSwatches: React.Dispatch<
    React.SetStateAction<{ [key: string]: ImageFile }>
  >,
  colorImages: { [key: string]: ImageFile[] },
  setColorImages: React.Dispatch<
    React.SetStateAction<{ [key: string]: ImageFile[] }>
  >,
  selectedColor: string,
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>
) => {
  if (
    window.confirm(
      `Are you sure you want to remove ${colorName} and all its images?`
    )
  ) {
    setColors((prev) => prev.filter((color) => color !== colorName));

    if (colorSwatches[colorName]) {
      const newSwatches = { ...colorSwatches };
      await deleteFromCloudinary(colorSwatches[colorName].publicId as string);
      delete newSwatches[colorName];
      setColorSwatches(newSwatches);
    }

    if (colorImages[colorName]) {
      const newImages = { ...colorImages };
      colorImages[colorName].forEach(async (image) => {
        await deleteFromCloudinary(image.publicId as string);
      });
      delete newImages[colorName];
      setColorImages(newImages);
    }

    if (selectedColor === colorName) {
      setSelectedColor("");
    }
  }
};

export const uploadSwatchImage = async (
  file: File,
  colorName: string,
  setColorSwatches: React.Dispatch<
    React.SetStateAction<{ [key: string]: ImageFile }>
  >,
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>
) => {
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

export const removeSwatchImage = async (
  colorName: string,
  colorSwatches: { [key: string]: ImageFile },
  setColorSwatches: React.Dispatch<
    React.SetStateAction<{ [key: string]: ImageFile }>
  >,
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const swatchImage = colorSwatches[colorName];
  if (swatchImage?.publicId) {
    setIsUploading(true);
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
    } finally {
      setIsUploading(false);
    }
  }

  const newSwatches = { ...colorSwatches };
  delete newSwatches[colorName];
  setColorSwatches(newSwatches);
};

export const handleProductImageUpload = async (
  files: File[],
  colorName: string,
  setColorImages: React.Dispatch<
    React.SetStateAction<{ [key: string]: ImageFile[] }>
  >,
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!colorName) return;

  setIsUploading(true);
  try {
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
      [colorName]: [...(prev[colorName] || []), ...uploadedImages].slice(0, 4),
    }));
  } catch (error) {
    console.error("Error uploading product images:", error);
  } finally {
    setIsUploading(false);
  }
};

export const removeProductImage = async (
  colorName: string,
  index: number,
  colorImages: { [key: string]: ImageFile[] },
  setColorImages: React.Dispatch<
    React.SetStateAction<{ [key: string]: ImageFile[] }>
  >
) => {
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

export const handleSubmitProductData = async ({
  type,
  e,
  router,
  colors,
  colorSwatches,
  colorImages,
  params,
}: {
  type: "create" | "edit";
  e: React.FormEvent;
  router: AppRouterInstance;
  colors: string[];
  colorSwatches: { [key: string]: ImageFile };
  colorImages: { [key: string]: ImageFile[] };
  params?: { id?: string };
}) => {
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

  // Send product data to the server
  if (type === "create") {
    const { data } = await axios.post("/api/product", { productData });
    if (data.success) {
      toast.success("Product created successfully");
      router.push("/admin/products");
    } else {
      toast.error("Error creating product");
    }
  }
  if (type === "edit") {
    const { data } = await axios.put(`/api/product?productId=${params?.id}`, {
      productData,
    });
    if (data.success) {
      toast.success("Product edited successfully");
      router.push("/admin/products");
    } else {
      toast.error("Error creating product");
    }
  }
};
