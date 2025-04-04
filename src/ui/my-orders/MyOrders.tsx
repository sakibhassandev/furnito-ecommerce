"use client";

import { fetchUserOrder } from "@/actions";
import { ProductType } from "@/lib/definitions";

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PackageIcon,
  ShoppingBagIcon,
  TruckIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ReviewModal from "./ReviewModal";

interface OrderItem {
  product: ProductType;
  quantity: number;
  color: string;
  size: string;
}

interface Order {
  id: string;
  orderDate: string;
  orderItems: OrderItem[];
  paymentMethod: string;
  status: "pending" | "processing" | "shipped" | "delivered";
  total: number;
  isReviewed: boolean;
}

const MyOrders = () => {
  //   getting userId from next-auth
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [order, setOrder] = useState<Order[]>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    if (!userId) return;
    const order = await fetchUserOrder(userId);
    setOrder(order.data);
  }, [userId]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const onReviewSubmitted = () => {
    fetchOrders();
  };

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const openReviewModal = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setSelectedOrderId(null);
    setIsReviewModalOpen(false);
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <div className="space-y-6">
        {order.length > 0 ? (
          [...order].reverse().map((order) => (
            <div
              key={crypto.randomUUID()}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div
                className="p-6 flex items-center justify-between cursor-pointer overflow-x-auto scrollbar-thin"
                onClick={() => toggleOrderExpansion(order.id)}
              >
                <div className="flex items-center space-x-4">
                  {order.status === "delivered" ? (
                    <PackageIcon className="w-6 h-6 text-green-500" />
                  ) : (
                    <TruckIcon className="w-6 h-6 text-blue-500" />
                  )}
                  <div>
                    <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                    <p className="text-sm text-gray-600">
                      Placed on {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status.toUpperCase()}
                  </span>
                  <span className="font-medium">
                    ${order.total.toLocaleString()}
                  </span>
                  {expandedOrder === order.id ? (
                    <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </div>
              {expandedOrder === order.id && (
                <div className="px-6 pb-6">
                  <div className="mt-4 divide-y">
                    {order.orderItems.map((item) => {
                      const discountPrice = parseFloat(
                        (item.product.hasDiscount
                          ? item.product.price -
                            (item.product.price * item.product.hasDiscount) /
                              100
                          : 0
                        ).toFixed(2)
                      );
                      return (
                        <div
                          key={crypto.randomUUID()}
                          className="py-4 flex items-center space-x-4"
                        >
                          <Link
                            href={`/product-details/${item.product.id}`}
                            target="_blank"
                          >
                            <Image
                              src={
                                item?.product?.images?.find(
                                  (img) => img.color === item?.color
                                )?.url[0] || item?.product?.images[0]?.url[0]
                              }
                              alt={item.product.name}
                              width={64}
                              height={64}
                              className="object-cover rounded"
                            />
                          </Link>
                          <div className="flex-1">
                            <Link
                              className="w-max font-medium hover:text-[#96732B]"
                              href={`/product-details/${item.product.id}`}
                              target="_blank"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-sm text-gray-600 capitalize">
                              Quantity: {item.quantity} | Color: {item.color} |
                              Size: {item.size}
                            </p>
                          </div>
                          <p className="font-medium">
                            $
                            {discountPrice
                              ? discountPrice
                              : item.product.price.toLocaleString()}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-6 flex items-center justify-end space-x-4">
                    <Link
                      href={`/order-details/${order.id}`}
                      className="px-4 py-2 text-white rounded bg-[#B88E2F] hover:bg-[#96732B] transition-colors text-sm font-medium"
                    >
                      View Order Details
                    </Link>
                    {order.status.toLowerCase() === "delivered" &&
                      (order.isReviewed ? (
                        <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-600">
                          <span className="mr-1">Reviewed</span>
                          <CheckIcon className="w-4 h-4" />
                        </span>
                      ) : (
                        <button
                          onClick={() => openReviewModal(order.id)}
                          className="px-4 py-2 bg-[#B88E2F] text-white rounded hover:bg-[#96732B] transition-colors text-sm font-medium inline-flex items-center"
                        >
                          Add Review
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-4 text-lg font-medium text-gray-900">
              No orders yet
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              When you place an order, it will appear here.
            </p>
            <div className="mt-6">
              <Link
                href="/shop"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#B88E2F] hover:bg-[#96732B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B88E2F]"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={closeReviewModal}
        orderId={selectedOrderId!}
        onReviewSubmitted={onReviewSubmitted}
      />
    </div>
  );
};

export default MyOrders;
