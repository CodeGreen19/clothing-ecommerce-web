import React from "react";

const Heading = ({ text }: { text: string }) => {
  return (
    <h1 className="mb-2 mt-5 px-2 text-sm font-bold">
      {text} <span className="text-lg text-red-500">*</span>
    </h1>
  );
};

export default Heading;
