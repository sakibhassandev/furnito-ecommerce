"use client";

import { useState } from "react";
import { InfoIcon } from "lucide-react";
import CheckoutProduct from "./CheckoutProduct";

import { useSelector } from "react-redux";
import { RootState } from "@/store/index";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { ApiError } from "@/utils/ApiError";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  discountPrice?: number;
}

export default function CheckoutSummary() {
  const router = useRouter();

  // Getting products from the Redux store from the cartItems slice
  const orderItems: OrderItem[] = useSelector(
    (state: RootState) => state.cartItems
  );

  //   Getting the user id from next-auth
  const { data } = useSession();
  const userId = data?.user?.id;

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const subtotal = orderItems.reduce(
    (acc, item) =>
      acc +
      (item.discountPrice ? item.discountPrice : item.price) * item.quantity,
    0
  );
  const deliveryCharge =
    orderItems.length === 0 ? 0 : subtotal > 5000 ? 0 : 120;
  const total = subtotal + deliveryCharge;

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-lg">
      <div className="p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6">Order Summary</h1>

        {/* Order Items */}
        <div className="space-y-6 mb-6 max-h-72 overflow-y-auto scrollbar-thin">
          {orderItems.length === 0 ? (
            <div className="text-center text-gray-500">
              <p className="text-lg font-medium">
                Your cart is currently empty.
              </p>
              <p className="text-sm">
                Add some products to your cart to place an order.
              </p>
            </div>
          ) : (
            orderItems.map((item: OrderItem) => (
              <CheckoutProduct
                key={item.id}
                productName={item.name}
                quantity={item.quantity}
                price={item.discountPrice ? item.discountPrice : item.price}
              />
            ))
          )}
        </div>

        <div className="h-px bg-gray-200 my-6" />

        {/* Price Breakdown */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Delivery Charge</span>
            <div className="flex items-center gap-1">
              <span>
                {deliveryCharge === 0
                  ? "Free"
                  : `$${deliveryCharge.toLocaleString()}`}
              </span>
              {deliveryCharge === 0 && (
                <InfoIcon className="h-4 w-4 text-gray-500" />
              )}
            </div>
          </div>
          <div className="h-px bg-gray-200 my-2" />
          <div className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>${total.toLocaleString()}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-4 mb-6">
          <h3 className="font-medium">Payment Method</h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer bg-gray-300 transition-colors">
              <input
                type="radio"
                name="payment"
                value="bank"
                disabled
                checked={paymentMethod === "bank"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <div className="flex-1">
                <div className="font-medium">Direct Bank Transfer</div>
                <div className="text-sm text-gray-600">
                  Make payment directly to our bank account
                </div>
                <p className="text-xs text-gray-600">
                  Currently bank transfer is unavailable
                </p>
              </div>
            </label>
            <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <div className="flex-1">
                <div className="font-medium">Cash on Delivery</div>
                <div className="text-sm text-gray-600">
                  Pay when you receive your order
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Privacy Notice */}
        <p className="text-sm text-gray-600 mb-6">
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our{" "}
          <a href="/privacy-policy" className="text-blue-600 hover:underline">
            privacy policy
          </a>
          .
        </p>

        {/* Place Order Button */}
        <button
          disabled={orderItems.length === 0}
          className={`rounded-lg w-full border-2 py-3 px-4 transition-colors duration-200 font-medium mt-6 ${
            orderItems.length === 0
              ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#B88E2F] border-[#B88E2F] text-white hover:bg-[#A77A1F] hover:border-[#A77A1F]"
          }`}
          onClick={async () => {
            if (orderItems.length > 0) {
              // Handle order placement
              try {
                const response = await axios.post("/api/place-order", {
                  userId,
                  orderItems,
                  paymentMethod,
                  total: parseFloat(total.toFixed(2)),
                  status: "pending",
                  deliveryCharge,
                });
                toast.success(`Your ${response.data?.message}`, {
                  position: "top-center",
                  autoClose: 2000,
                  theme: "light",
                });
                router.push("/my-orders");
              } catch (error) {
                const axiosError = error as AxiosError<ApiError>;
                toast.error(
                  axiosError.response?.data?.message || "Something went wrong",
                  {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "light",
                  }
                );
              }
            }
          }}
        >
          Place Order - ${total.toLocaleString()}
        </button>
      </div>
    </div>
  );
}
