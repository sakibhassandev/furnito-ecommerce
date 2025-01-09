"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeftIcon,
  PackageIcon,
  TruckIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
  CreditCardIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ProductType } from "@/lib/definitions";
import axios, { AxiosError } from "axios";
import { ApiError } from "@/utils/ApiError";

interface OrderItem {
  product: ProductType;
  quantity: number;
}

interface Order {
  id: string;
  orderDate: string;
  orderItems: OrderItem[];
  paymentMethod: string;
  status: "pending" | "processing" | "shipped" | "delivered";
  trackingNumber: string;
  total: number;
  deliveryCharge: number;
  user: {
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      zip: string;
    }[];
  };
}

export default function OrderDetails({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order>({} as Order);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post("/api/get-order", {
          orderId,
        });
        setOrder(response.data.data);
      } catch (error) {
        const err = error as AxiosError<ApiError>;
        console.log(err);
      }
    };

    fetchOrders();
  }, [orderId]);

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <PackageIcon className="w-6 h-6" />;
      case "processing":
        return <ClockIcon className="w-6 h-6" />;
      case "shipped":
        return <TruckIcon className="w-6 h-6" />;
      case "delivered":
        return <CheckCircleIcon className="w-6 h-6" />;
    }
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 text-gray-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8">
      <Link
        href="/my-orders"
        className="inline-flex items-center text-blue-600 hover:underline mb-6 transition-colors duration-200"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to My Orders
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 g?ap-4">
            <h1 className="text-3xl font-bold">Order #{order?.id}</h1>
            <div
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                order?.status
              )}`}
            >
              {getStatusIcon(order?.status)}
              <span className="ml-2">{order?.status?.toUpperCase()}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <ClockIcon className="w-5 h-5 mr-2 text-gray-600" />
                Order Information
              </h2>
              <p className="text-gray-600 mb-2">
                Date: {new Date(order?.orderDate)?.toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-2">
                Total: ${order?.total?.toLocaleString()}
              </p>
              {order?.trackingNumber && (
                <p className="text-gray-600">
                  Tracking Number: {order?.trackingNumber}
                </p>
              )}
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <MapPinIcon className="w-5 h-5 mr-2 text-gray-600" />
                Shipping Address
              </h2>
              <p className="text-gray-600">{`${order?.user?.address[0]?.street}, ${order?.user?.address[0]?.state}, ${order?.user?.address[0]?.city}, ${order?.user?.address[0]?.country}, ${order?.user?.address[0]?.zip}`}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Order Items</h2>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-3 px-4">Product</th>
                      <th className="py-3 px-4">Quantity</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.orderItems?.map((item) => {
                      const discountPrice = parseFloat(
                        (item.product.hasDiscount
                          ? item.product.price -
                            (item.product.price * item.product.hasDiscount) /
                              100
                          : 0
                        ).toFixed(2)
                      );
                      return (
                        <tr
                          key={item.product.id}
                          className="border-t border-gray-200"
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <Image
                                src={item.product?.images[0]?.url[0]}
                                alt={item.product?.name}
                                width={64}
                                height={64}
                                className="object-cover rounded-md mr-4"
                              />
                              <span className="font-medium">
                                {item.product?.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4">{item.quantity}</td>
                          <td className="py-4 px-4">
                            $
                            {(discountPrice
                              ? discountPrice
                              : item.product?.price
                            ).toLocaleString()}
                          </td>
                          <td className="py-4 px-4">
                            $
                            {(
                              (discountPrice
                                ? discountPrice
                                : item.product?.price) * item.quantity
                            ).toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    {order?.deliveryCharge > 0 && (
                      <tr className="font-semibold bg-gray-100">
                        <td colSpan={3} className="py-4 px-4 text-right">
                          Delivery Fee:
                        </td>
                        <td className="py-4 px-4">${order?.deliveryCharge}</td>
                      </tr>
                    )}
                    <tr className="font-semibold bg-gray-100">
                      <td colSpan={3} className="py-4 px-4 text-right">
                        Total:
                      </td>
                      <td className="py-4 px-4">
                        ${order?.total?.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
          <CreditCardIcon className="w-5 h-5 mr-2" />
          Download Invoice
        </button>
      </div>
    </div>
  );
}
