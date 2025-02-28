"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, Search, X } from "lucide-react";
import Link from "next/link";
import { ProductType } from "@/lib/definitions";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { deleteProduct, fetchProducts } from "@/actions";
import { toast } from "react-toastify";
import { deleteFromCloudinary } from "@/lib/cloudinary";

const AdminProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductType>(
    {} as ProductType
  );
  const [searchQuery, setSearchQuery] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const product = await fetchProducts();
      setProducts(Array.isArray(product) ? product : []);
    };

    getProducts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setSelectedProduct({} as ProductType);
      }
    };

    if (selectedProduct.id) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedProduct]);

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products?.filter((product) => product.id !== productId));
      const deletedProduct = await deleteProduct(productId);
      console.log(deletedProduct);
      if (!deletedProduct.success) {
        toast.error("Failed to delete product");
      } else {
        deletedProduct?.data?.deletedImagesData?.forEach(
          (image: { publicId: string[] }) => {
            image.publicId.forEach((id) => deleteFromCloudinary(id));
          }
        );
        deletedProduct?.data?.deletedColorsData?.forEach(
          (color: { publicId: string }) => {
            deleteFromCloudinary(color.publicId);
          }
        );
        toast.success("Product deleted");
      }
    }
  };

  const filteredProducts = (products || []).filter((product) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      product?.name?.toLowerCase().includes(searchLower) ||
      product?.sku?.toLowerCase().includes(searchLower) ||
      product?.description?.toLowerCase().includes(searchLower) ||
      product?.categories?.some((category) =>
        category?.toLowerCase()?.includes(searchLower)
      ) ||
      product?.tags?.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link
          href="/admin/products/add"
          className="bg-[#B88E2F] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[#96732B] transition-colors duration-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, SKU, description, categories, or tags..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.reverse().map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <Image
                          className="h-10 w-10 rounded-lg object-cover"
                          src={product?.images[0]?.url[0]}
                          alt=""
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product?.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product?.sku}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${product?.price?.toFixed(2)}
                    </div>
                  </td>
                  {/* Quantity */}
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {product.quantity} units
                    </div>
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="text-[#B88E2F] hover:text-[#96732B] p-1 hover:bg-[#B88E2F] hover:bg-opacity-10 rounded"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <Link
                        href={`/admin/products/edit/${product.id}`}
                        className="text-[#B88E2F] hover:text-[#96732B] p-1 hover:bg-[#B88E2F] hover:bg-opacity-10 rounded"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProduct.id && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Product Details</h2>
                <Button
                  onClick={() => {
                    window.open(
                      `/product-details/${selectedProduct.id}`,
                      "_blank"
                    );
                  }}
                  size={"sm"}
                >
                  View Product
                </Button>
                <button
                  onClick={() => setSelectedProduct({} as ProductType)}
                  className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="aspect-w-1 aspect-h-1 mb-4">
                    <Image
                      className="w-full h-64 object-cover rounded-lg"
                      src={selectedProduct?.images[0]?.url[0]}
                      alt={selectedProduct?.name}
                      width={1920}
                      height={1080}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {selectedProduct?.images[0].url
                      .slice(1)
                      .map((image, index: number) => (
                        <Image
                          key={index}
                          src={image}
                          alt={`${selectedProduct.name} ${index + 2}`}
                          width={1920}
                          height={1080}
                          className="w-full h-30 object-cover rounded-lg"
                        />
                      ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">
                      {selectedProduct?.name}
                    </h3>
                    <p className="text-gray-500">SKU: {selectedProduct?.sku}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Description
                    </h4>
                    <p className="mt-1">{selectedProduct?.description}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Price
                      </h4>
                      <p className="text-2xl font-bold text-[#B88E2F]">
                        ${selectedProduct?.price?.toFixed(2)}
                      </p>
                    </div>
                    {/* Quantity */}
                    {/* <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Quantity
                      </h4>
                      <p className="text-xl font-semibold">
                        {selectedProduct.quantity} units
                      </p>
                    </div> */}
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Categories
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedProduct?.categories?.map(
                        (category: string, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                          >
                            {category}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Tags</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedProduct?.tags?.map(
                        (tag: string, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Sizes
                      </h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedProduct?.sizes?.map(
                          (size: string, index: number) => (
                            <span
                              key={index}
                              className="px-2 py-1 border rounded text-sm"
                            >
                              {size}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Colors
                      </h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedProduct?.colors?.map((color, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 border rounded text-sm"
                          >
                            {color.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
