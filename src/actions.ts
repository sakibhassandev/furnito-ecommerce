"use server";

import axios from "axios";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(
      `${process.env.SITE_URL}/api/get-products`
    );
    if (!response.data.data) {
      return {
        message: "No products found",
        success: false,
      };
    }
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.data.message || "Something went wrong",
        success: false,
      };
    }
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

export const fetchProduct = async (productId: string) => {
  try {
    const response = await axios.get(
      `${process.env.SITE_URL}/api/product?productId=${productId}`
    );
    if (!response.data.data) {
      return {
        message: "No products found",
        success: false,
      };
    }
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.data.message || "Something went wrong",
        success: false,
      };
    }
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const response = await axios.delete(
      `${process.env.SITE_URL}/api/product/?productId=${productId}`
    );
    if (!response.data.data) {
      return {
        message: "No products found",
        success: false,
      };
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.data.message || "Something went wrong",
        success: false,
      };
    }
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

export const fetchOrder = async (orderId: string) => {
  try {
    const response = await axios.post(`${process.env.SITE_URL}/api/order`, {
      orderId,
    });
    if (!response.data.data) {
      return {
        message: "No orders found",
        success: false,
      };
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.data.message || "Something went wrong",
        success: false,
      };
    }
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

export const fetchOrders = async () => {
  try {
    const response = await axios.get(
      `${process.env.SITE_URL}/api/get-all-orders`
    );
    if (!response.data.data) {
      return {
        message: "No orders found",
        success: false,
      };
    }
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.data.message || "Something went wrong",
        success: false,
      };
    }
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

export const fetchUserOrder = async (userId: string) => {
  try {
    const response = await axios.post(
      `${process.env.SITE_URL}/api/get-all-orders`,
      {
        userId,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.data.message || "Something went wrong",
        success: false,
      };
    }
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

export const changeOrderStatus = async ({
  orderId,
  newStatus,
}: {
  orderId: string;
  newStatus: string;
}) => {
  try {
    const response = await axios.put(`${process.env.SITE_URL}/api/order`, {
      orderId,
      status: newStatus,
    });
    if (!response.data.success) {
      return {
        message: "Failed to update order status",
        success: false,
      };
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.data.message || "Something went wrong",
        success: false,
      };
    }
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

export const deleteOrder = async (orderId: string) => {
  try {
    const response = await axios.delete(`${process.env.SITE_URL}/api/order`, {
      data: {
        orderId,
      },
    });
    if (!response.data.success) {
      return {
        message: "Failed to update order status",
        success: false,
      };
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.data.message || "Something went wrong",
        success: false,
      };
    }
    return {
      message: "An error occurred",
      success: false,
    };
  }
};
