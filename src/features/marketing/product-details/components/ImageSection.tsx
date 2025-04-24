import Image from "next/image";
import React from "react";

const ImageSection = () => {
  return (
    <div>
      <Image
        className="w-full"
        src={"/product.png"}
        height={400}
        width={400}
        alt="product_img"
      />
    </div>
  );
};

export default ImageSection;
