import Image from "next/image";
import React from "react";

const UserProfile = () => {
  return (
    <div className="mr-2 flex items-center gap-2">
      <div className="size-8 overflow-hidden rounded-full">
        <Image
          src={"/user.webp"}
          height={30}
          width={30}
          alt="profile"
          className="w-full"
        />
      </div>
      <div className="">
        <h1 className="text-xs font-bold">Rofiq Uddin</h1>
        <h3 className="text-xs text-slate-400">Sales manager</h3>
      </div>
    </div>
  );
};

export default UserProfile;
