import React from "react";

const BrowseCollection = () => {
  return (
    <div className="mt-5 flex flex-col items-center justify-center px-5 lg:mt-0">
      <h1 className="mb-1 text-2xl font-bold text-white">Browse Collections</h1>
      <p className="max-w-2xl text-center text-sm text-slate-200 lg:text-base">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe commodi
        aperiam, atque quibusdam ipsum placeat cupiditate tempore totam
      </p>
      <div className="mt-4 flex gap-1 text-white">
        <div className="flex w-40 justify-center gap-2 rounded-[50px] border border-slate-900 bg-gradient-to-br from-pink-400 via-rose-500 to-pink-700 p-5 text-center font-bold">
          Men
        </div>
        <div className="flex w-40 justify-center gap-2 rounded-[50px] border border-slate-900 bg-gradient-to-br from-pink-400 via-rose-500 to-pink-700 p-5 font-bold">
          Women
        </div>
      </div>
    </div>
  );
};

export default BrowseCollection;
