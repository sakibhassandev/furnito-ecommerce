"use client";

import { fetchUserOrder } from "@/actions";
import { ProductType } from "@/lib/definitions";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  PackageIcon,
  ShoppingBagIcon,
  TruckIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
}

const MyOrders = () => {
  //   getting userId from next-auth
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      if (!userId) return;
      const order = await fetchUserOrder(userId);
      setOrders(order.data);
    };

    getOrders();
  }, [userId]);

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
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
        {orders.length > 0 ? (
          [...orders].reverse().map((order) => (
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
                          <div className="flex-1">
                            <h3 className="font-medium">{item.product.name}</h3>
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
                  <div className="mt-6 flex justify-end">
                    <Link
                      href={`/order-details/${order.id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      View Order Details
                    </Link>
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
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
