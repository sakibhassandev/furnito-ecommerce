export type CartState = {
  id: string | number;
  img: string;
  name: string;
  price: number;
  quantity: number;
  discountPrice?: number;
};

export type WishListState = {
  id: string | number;
  img: string;
  name: string;
  price: number;
  quantity: number;
  discountPrice?: number;
};

export type ProductType = {
    id: string | number;
    name: string;
    description: string;
    sku: string;
    categories: string[];
    tags: string[];
    reviews: { name: string; rating: number; message: string }[];
    hasDiscount?: number;
    sizes: string[];
    colors: { id: string; name: string; image: string }[];
    images: { [key: string]: string[]}
    price: number;
  };