import ProductCard from "@/features/marketing/product/components/ProductCard";
import React from "react";
import Heading from "./Heading";

const NewArrived = () => {
  return (
    <div className="container m-auto">
      <Heading text="New Arrived" />
      <div className="mt-2 grid grid-cols-2 gap-1 px-2 md:grid-cols-4 md:gap-4">
        <ProductCard
          product={{
            id: 1,
            description: "description",
            image: "/product.png",
            name: "wahat fasd",
            price: "1220",
          }}
        />
        <ProductCard
          product={{
            id: 1,
            description: "description",
            image: "/product.png",
            name: "wahat fasd",
            price: "1220",
          }}
        />
        <ProductCard
          product={{
            id: 1,
            description: "description",
            image: "/product.png",
            name: "wahat fasd",
            price: "1220",
          }}
        />
        <ProductCard
          product={{
            id: 1,
            description: "description",
            image: "/product.png",
            name: "wahat fasd",
            price: "1220",
          }}
        />
      </div>
    </div>
  );
};

export default NewArrived;
