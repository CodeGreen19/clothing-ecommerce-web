"use client";

import React from "react";
import ProductCard from "../../product/components/ProductCard";
import { getDetailsProduct } from "../server/detail.action";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ImageSection from "./ImageSection";
import ProductInfoAndActions from "./ProductInfoAndActions";

const ProductDetails = () => {
  const params = useParams() as { slug: string };
  const { data, isPending, isRefetching } = useQuery({
    queryKey: ["m_single_product"],
    queryFn: async () => await getDetailsProduct(params.slug),
  });

  // await getDetailsProduct()
  return isPending || isRefetching ? (
    <div className="min-h-screen">Loading</div>
  ) : (
    data && (
      <div className="container m-auto min-h-screen">
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2">
          <div className="w-full bg-blue-100">
            <ImageSection />
          </div>
          <div className="w-full bg-rose-200">
            <ProductInfoAndActions info={data} />
          </div>
        </div>
        <div className="mt-5 h-52 bg-purple-100">{data.description}</div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2">
          <div className="h-52 w-full bg-blue-100">Ratings</div>
          <div className="h-52 w-full bg-rose-200">Reviews</div>
        </div>
        <div>
          <h1>Recomended for you.</h1>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 1 }).map((item, i) => (
              <ProductCard
                key={i}
                product={{
                  name: "wahat fasd",
                  slug: "this-slug",
                  price: 413,
                  category: "category",
                  prevPrice: 600,
                  subCategory: "fadss",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default ProductDetails;
