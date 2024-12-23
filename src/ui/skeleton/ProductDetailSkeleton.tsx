const ProductDetailSkeleton = () => {
  return (
    <div className="mx-auto max-w-[1200px] px-4 my-20">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Image Gallery Skeleton */}
        <div className="space-y-4">
          <div className="aspect-square max-w-[500px] animate-pulse rounded-lg bg-gray-200" />
          <div className="grid grid-cols-4 gap-4 max-w-[500px]">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="aspect-square animate-pulse rounded-md bg-gray-200"
              />
            ))}
          </div>
        </div>

        {/* Product Details Skeleton */}
        <div className="space-y-6 max-w-[500px]">
          {/* Title */}
          <div className="space-y-2">
            <div className="h-8 w-[400px] animate-pulse rounded-md bg-gray-200" />
            <div className="h-4 w-[450px] animate-pulse rounded-md bg-gray-200" />
          </div>

          {/* Size Options */}
          <div className="space-y-2">
            <div className="h-4 w-16 animate-pulse rounded-md bg-gray-200" />
            <div className="flex gap-2">
              {["Queen", "King", "California King"].map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-24 animate-pulse rounded-md bg-gray-200"
                />
              ))}
            </div>
          </div>

          {/* Color Options */}
          <div className="space-y-2">
            <div className="h-4 w-16 animate-pulse rounded-md bg-gray-200" />
            <div className="h-6 w-6 animate-pulse rounded-full bg-gray-200" />
          </div>

          {/* Price */}
          <div className="h-6 w-24 animate-pulse rounded-md bg-gray-200" />

          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-4 max-w-[400px]">
            <div className="h-12 w-[100px] animate-pulse rounded-md bg-gray-200" />
            <div className="h-12 w-[200px] animate-pulse rounded-md bg-gray-200" />
            <div className="h-12 w-12 animate-pulse rounded-md bg-gray-200" />
          </div>

          {/* Metadata */}
          <div className="space-y-4 pt-6">
            <div className="h-4 w-[200px] animate-pulse rounded-md bg-gray-200" />
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-20 animate-pulse rounded-full bg-gray-200"
                />
              ))}
            </div>
          </div>

          {/* Social Share */}
          <div className="flex gap-2 pt-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-8 w-8 animate-pulse rounded-md bg-gray-200"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8 space-y-4 max-w-[500px]">
        <div className="h-6 w-24 animate-pulse rounded-md bg-gray-200" />
        <div className="space-y-4">
          <div className="h-4 w-32 animate-pulse rounded-md bg-gray-200" />
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-4 w-4 animate-pulse rounded-full bg-gray-200"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
