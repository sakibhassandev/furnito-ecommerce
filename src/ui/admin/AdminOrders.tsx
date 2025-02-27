"use client";

import React, { useEffect, useMemo, useState } from "react";
import { X, Eye, Search, ChevronDown, Trash2 } from "lucide-react";
import { OrderStatus, OrderType } from "@/lib/definitions";
import { toast } from "react-toastify";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { changeOrderStatus, deleteOrder, fetchOrders } from "@/actions";

const AdminOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState<OrderType>(
    {} as OrderType
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

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
    const getOrders = async () => {
      const orders = await fetchOrders();
      setOrders(orders);
    };
    getOrders();
  }, []);

  const handleStatusChange = async (
    orderId: string,
    newStatus: OrderStatus
  ) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    const orderStatus = await changeOrderStatus({ orderId, newStatus });
    if (orderStatus.success) {
      toast.success("Order status updated successfully!");
    } else {
      toast.error("Failed to update order status!");
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter((order) => order.id !== orderId));
      const deletedOrder = await deleteOrder(orderId);
      if (deletedOrder.success) {
        toast.success("Order deleted successfully!");
      } else {
        toast.error("Failed to delete order!");
      }
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order?.id?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        order?.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order?.user?.email?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-4">Orders</h1>
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders by ID, customer name, or email"
              className="pl-9 h-12 text-base font-mono bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-12 px-4 font-normal">
                {statusFilter === "all"
                  ? "All Orders"
                  : statusFilter.charAt(0).toUpperCase() +
                    statusFilter.slice(1)}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => setStatusFilter("all")}>
                All Orders
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setStatusFilter("delivered")}>
                Delivered
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setStatusFilter("processing")}>
                Processing
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setStatusFilter("pending")}>
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setStatusFilter("shipped")}>
                Shipped
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setStatusFilter("cancelled")}>
                Cancelled
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px] uppercase text-xs font-medium">
                Order Info
              </TableHead>
              <TableHead className="w-[200px] uppercase text-xs font-medium">
                Customer
              </TableHead>
              <TableHead className="min-w-[300px] uppercase text-xs font-medium">
                Products
              </TableHead>
              <TableHead className="text-right uppercase text-xs font-medium">
                Total
              </TableHead>
              <TableHead className="w-[150px] uppercase text-xs font-medium">
                Status
              </TableHead>
              <TableHead className="w-[100px] text-right uppercase text-xs font-medium">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order?.id} className="group">
                <TableCell>
                  <div className="space-y-0.5">
                    <div className="font-medium">{order.id}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(order?.orderDate)?.toLocaleDateString("en-GB")}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-0.5">
                    <div className="font-medium">{order?.user?.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {order?.user?.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-0.5">
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="text-sm">
                        {item.product.name}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="font-medium">${order.total.toFixed(2)}</div>
                </TableCell>
                <TableCell>
                  <Select
                    value={order.status}
                    onValueChange={(value) =>
                      handleStatusChange(order.id, value as OrderStatus)
                    }
                  >
                    <SelectTrigger
                      className={`w-[130px] border-0 font-medium ${
                        order.status === "delivered"
                          ? "bg-emerald-100 text-emerald-700"
                          : order.status === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : order.status === "processing"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "shipped"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="delivered"
                        className="text-emerald-600"
                      >
                        Delivered
                      </SelectItem>
                      <SelectItem value="pending" className="text-amber-600">
                        Pending
                      </SelectItem>
                      <SelectItem value="processing" className="text-blue-600">
                        Processing
                      </SelectItem>
                      <SelectItem value="shipped" className="text-purple-600">
                        Shipped
                      </SelectItem>
                      <SelectItem value="cancelled" className="text-red-600">
                        Cancelled
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View order</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100"
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete order</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

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
                      <p className="text-sm text-gray-500">Delivery Charge</p>
                      <p className="font-medium">
                        ${selectedOrder?.deliveryCharge}
                      </p>
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
