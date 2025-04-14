import React from "react";
import ProductCard from "../product/components/ProductCard";

const ProductDetails = () => {
  return (
    <div className="container m-auto min-h-screen">
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2">
        <div className="h-52 w-full bg-blue-100">ImageSection</div>
        <div className="h-52 w-full bg-rose-200">DetailSection</div>
      </div>
      <div className="mt-5 h-52 bg-purple-100">
        descriptions, Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Voluptate, voluptatem. Molestiae sit sapiente architecto eveniet
        praesentium libero. Inventore ipsum nihil libero dolorum maxime ipsam
        nobis, fugit neque molestiae, ea earum.
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2">
        <div className="h-52 w-full bg-blue-100">Ratings</div>
        <div className="h-52 w-full bg-rose-200">Reviews</div>
      </div>
      <div>
        <h1>Recomended for you.</h1>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((item, i) => (
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
  );
};

export default ProductDetails;
