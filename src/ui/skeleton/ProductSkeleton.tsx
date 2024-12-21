const ProductSkeleton = ({ count }: { count: number }) => {
  return (
    <div className="mx-4 xsm:mx-8 products-container max-w-screen-xl xl:mx-auto">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] max-sm:justify-items-center gap-12 sm:gap-10 mt-10 productContainer">
        {Array(count)
          .fill(null)
          .map((el, i: number) => {
            return (
              <div key={i} className="product group">
                <div className="overflow-hidden rounded shadow-[0px_0px_8px_-3px_rgba(0,0,0,0.4)]">
                  <div className="relative overflow-hidden ">
                    <div className="bg-gray-200 animate-pulse w-full h-[315px]" />
                  </div>
                </div>
                <div className="pt-4 ">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                  <div className="h-4 animate-pulse bg-gray-200 rounded w-24" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductSkeleton;
