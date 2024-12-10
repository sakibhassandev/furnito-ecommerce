import { ProductType } from "@/lib/definitions";

export type SortOption = {
  label: string;
  value: "featured" | "newest" | "price_asc" | "price_desc";
};

export const SORT_OPTIONS: SortOption[] = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

export function sortProducts(
  products: ProductType[],
  sortBy: SortOption["value"]
): ProductType[] {
  const sortedProducts = [...products];

  switch (sortBy) {
    case "newest":
      return sortedProducts.sort(
        (a, b) =>
          new Date(b.updatedAt ?? 0).getTime() -
          new Date(a.updatedAt ?? 0).getTime()
      );
    case "price_asc":
      return sortedProducts.sort((a, b) => a.price - b.price);
    case "price_desc":
      return sortedProducts.sort((a, b) => b.price - a.price);
    default:
      return sortedProducts;
  }
}
