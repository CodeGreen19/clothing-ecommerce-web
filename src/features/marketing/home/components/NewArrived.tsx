import ProductCard from "@/features/marketing/product/components/ProductCard";
import React from "react";
import Heading from "./Heading";
import { newArrievedProducts } from "../server/new-arrieved.action";

const NewArrived = async () => {
  const products = await newArrievedProducts();

  return (
    <div className="container m-auto">
      <Heading text="New Arrived" />
      <div className="mt-2 grid grid-cols-2 gap-1 px-2 md:grid-cols-4 md:gap-4">
        {products.map((item) => (
          <ProductCard key={item.name} product={item} />
        ))}
      </div>
    </div>
  );
};

export default NewArrived;
