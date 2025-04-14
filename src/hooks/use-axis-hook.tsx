import { useState, useEffect } from "react";

export function useYAxisThreshold(threshold: number) {
  const [crossed, setCrossed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setCrossed(y >= threshold);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return crossed;
}
