import { PayloadAction } from "@reduxjs/toolkit";

export type CartState = {
  id: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
  discountPrice?: number;
};

export type WishListState = {
  id: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
  discountPrice?: number;
};

export type ProductType = {
  id: string;
  name: string;
  description: string;
  sku: string;
  categories: string[];
  tags: string[];
  reviews: { name: string; rating: number; message: string }[];
  hasDiscount?: number;
  sizes: string[];
  colors: { id: string; name: string; image: string }[];
  images: { color: string; url: string[] }[];
  price: number;
  updatedAt?: string;
};

export type CommonCartSectionProps = {
  productList?: CartState[];
  emptyCardName?: string;
  toastName: string;
  increaseAction: (payload: {
    id: CartState["id"];
  }) => PayloadAction<{ id: CartState["id"] }>;
  decreaseAction: (payload: {
    id: CartState["id"];
  }) => PayloadAction<{ id: CartState["id"] }>;
  removeAction: (payload: {
    id: CartState["id"];
  }) => PayloadAction<{ id: CartState["id"] }>;
  bottomSec?: React.ReactNode;
};

export type FaqItem = {
  question: string;
  answer: string;
};
