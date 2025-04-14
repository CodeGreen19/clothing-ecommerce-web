"use client";

import { imagesForBanner } from "@/data/constant";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesForBanner.length);
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="container m-auto md:px-2 md:py-5">
      <div className="relative aspect-[16/6] w-full overflow-hidden bg-white md:rounded-lg">
        {imagesForBanner.map((image, index) => (
          <Image
            key={image.id}
            src={image.src}
            height={500}
            width={500}
            className={`absolute inset-0 h-full w-full bg-contain transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            alt="banner_img"
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
