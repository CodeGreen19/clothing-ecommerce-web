import React from "react";

const StatusBox = ({ stock }: { stock: number }) => {
  return stock === 0 ? (
    <span className="flex items-center justify-center space-x-1 rounded-full bg-red-500/5 p-1 text-xs text-red-500 shadow">
      <span className="size-2 rounded-full bg-red-500/90"></span>
      <span>Out of stock</span>
    </span>
  ) : stock > 0 && stock < 11 ? (
    <span className="flex items-center justify-center space-x-1 rounded-full bg-yellow-500/5 p-1 text-xs text-yellow-500 shadow">
      <span className="size-2 rounded-full bg-yellow-500/90"></span>
      <span>Almost finished</span>
    </span>
  ) : (
    <span className="flex items-center justify-center space-x-1 rounded-full bg-green-500/5 p-1 text-xs text-green-500 shadow">
      <span className="size-2 rounded-full bg-green-500/90"></span>
      <span>In stock</span>
    </span>
  );
};

export default StatusBox;
