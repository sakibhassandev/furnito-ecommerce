import { Package, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import AdminDashboardRecentOrders from "./AdminDashboardRecentOrders";
import { fetchOrders, fetchProducts } from "@/actions";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };

    const getOrders = async () => {
      const orders = await fetchOrders();
      setOrders(orders);
    };

    getProducts();
    getOrders();
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
