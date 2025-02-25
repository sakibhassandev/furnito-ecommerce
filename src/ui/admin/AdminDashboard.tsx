import axios from "axios";
import { Package, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import AdminDashboardRecentOrders from "./AdminDashboardRecentOrders";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("/api/get-products");
      setProducts(response.data.data);
    };
    fetchProducts();

    const fetchOrders = async () => {
      const response = await axios.get("/api/get-all-orders");
      setOrders(response.data.data);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-[#B88E2F] bg-opacity-10 rounded-full">
              <ShoppingCart className="w-6 h-6 text-[#B88E2F]" />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm">Total Orders</h3>
              <p className="text-2xl font-bold">{orders?.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-[#B88E2F] bg-opacity-10 rounded-full">
              <Package className="w-6 h-6 text-[#B88E2F]" />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm">Total Products</h3>
              <p className="text-2xl font-bold">{products?.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <AdminDashboardRecentOrders orders={orders} />
      </div>
    </div>
  );
};

export default AdminDashboard;
