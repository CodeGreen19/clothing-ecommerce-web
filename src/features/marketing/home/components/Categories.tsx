import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import Heading from "./Heading";

const Categories = () => {
  const data = Array.from({ length: 8 });
  return (
    <div className="">
      <div className="container m-auto">
        <Heading text="Categories" />
        <div className="grid grid-cols-2 gap-2 px-2 md:grid-cols-4">
          {data.map((item, i) => (
            <Card key={i}>
              <CardContent className="rounded-lg p-0">
                <Image
                  height={200}
                  width={200}
                  src={"/t-shirt-black.jpg"}
                  alt="image"
                  className="w-full rounded-md object-cover"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
