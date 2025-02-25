"use client";

import React, { useEffect, useState } from "react";
import { X, Eye, Search } from "lucide-react";
import axios from "axios";
import { OrderType } from "@/lib/definitions";
import { toast } from "react-toastify";

const AdminOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState<OrderType>(
    {} as OrderType
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setSelectedOrderId(searchParams.get("id"));
  }, []);

  useEffect(() => {
    if (selectedOrderId) {
      const order = orders.find((order) => order.id === selectedOrderId);
      if (order) {
        setSearchQuery(selectedOrderId);
        setSelectedOrder(order);
      }
    }
  }, [orders, selectedOrderId]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get("/api/get-all-orders");
      setOrders(response.data.data);
    };
    fetchOrders();
  }, []);

  const handleStatusChange = (
    orderId: string,
    newStatus: "pending" | "processing" | "shipped" | "delivered"
  ) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    axios
      .put("/api/get-order", { orderId, status: newStatus })
      .then(({ data }) => {
        if (data.success) {
          toast.success("Order status updated successfully!");
        } else {
          toast.error("Failed to update order status!");
        }
      });
  };

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter((order) => order.id !== orderId));
    }
    axios.delete("/api/get-order", { data: { orderId } }).then(({ data }) => {
      if (data.success) {
        toast.success("Order deleted successfully!");
      } else {
        toast.error("Failed to delete order!");
      }
    });
  };

  const filteredOrders = orders.filter(
    (order) =>
      order?.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order?.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order?.user?.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Orders</h1>
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {order.id}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(order.orderDate).toLocaleDateString("en-Gb")}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {order.user.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {order.orderItems.map((product) => (
                        <div key={product.product.id}>
                          {product.product.name} |
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      ${order.total.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <select
                        className={`text-sm rounded-full px-3 py-1 capitalize font-medium ${getStatusColor(
                          order.status
                        )} border-none focus:outline-none focus:ring-2 focus:ring-[#B88E2F] bg-opacity-70`}
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(
                            order.id,
                            e.target.value as
                              | "pending"
                              | "processing"
                              | "shipped"
                              | "delivered"
                          )
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-[#B88E2F] hover:text-[#96732B] p-1 hover:bg-[#B88E2F] hover:bg-opacity-10 rounded"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                        title="Delete Order"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder.id && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Order Details</h2>
                <button
                  onClick={() => setSelectedOrder({} as OrderType)}
                  className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Order Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="font-medium">{selectedOrder.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">
                        {new Date(selectedOrder.orderDate).toLocaleDateString(
                          "en-Gb"
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p
                        className={`inline-flex px-2 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(
                          selectedOrder.status
                        )}`}
                      >
                        {selectedOrder.status}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Customer Details</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="text-gray-500">Name:</span>{" "}
                      {selectedOrder?.user?.name}
                    </p>
                    <p>
                      <span className="text-gray-500">Email:</span>{" "}
                      {selectedOrder?.user?.email}
                    </p>
                    <p>
                      <span className="text-gray-500">Address:</span>{" "}
                      {selectedOrder?.user?.address[0]?.street}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Products</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            Product
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            Quantity
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            Price
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedOrder?.orderItems?.map((item, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2">{item.product.name}</td>
                            <td className="px-4 py-2">{item.quantity}</td>
                            <td className="px-4 py-2">${item.product.price}</td>
                            <td className="px-4 py-2">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="text-lg font-medium">Total Amount</div>
                  <div className="text-xl font-bold text-[#B88E2F]">
                    ${selectedOrder?.total?.toFixed(2)}
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  {selectedOrder.status === "pending" && (
                    <button
                      onClick={() => {
                        handleStatusChange(selectedOrder.id, "processing");
                        setSelectedOrder({} as OrderType);
                      }}
                      className="bg-[#B88E2F] text-white px-4 py-2 rounded-lg hover:bg-[#96732B]"
                    >
                      Approve Order
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedOrder({} as OrderType)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
