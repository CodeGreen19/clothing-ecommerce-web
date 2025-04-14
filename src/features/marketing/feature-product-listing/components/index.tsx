import React from "react";
import FeatureProductListings from "./FeatureProductFilteringSheet";
import ProductCard from "../../product/components/ProductCard";

const FeatureProductListing = () => {
  return (
    <div className="min-h-screen">
      <div className="min-h-32 bg-pink-100">Banner here</div>
      <div className="container m-auto flex flex-row">
        <h1 className="sr-only">for product filtering</h1>
        <div className="hidden w-[250px] flex-none bg-gray-200 md:block">
          side bar Lorem ipsum dolor sit amet
        </div>
        <div className="fixed bottom-0 left-0 z-50 flex h-10 w-full items-center justify-center bg-pink-200 md:hidden">
          <FeatureProductListings>
            <div>Filter By</div>
          </FeatureProductListings>
        </div>
        <div className="w-full">
          <div className="h-20 bg-blue-200">Top section</div>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 30 }).map((item, i) => (
              <ProductCard
                key={i}
                product={{
                  id: Math.random(),
                  description: "description",
                  image: "/product.png",
                  name: "wahat fasd",
                  price: "1220",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureProductListing;
