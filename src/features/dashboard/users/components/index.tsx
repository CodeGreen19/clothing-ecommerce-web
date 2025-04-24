"use client";

import React from "react";
import { useAdminUsers } from "../hooks/user.query";
import SpinnerLoading from "../../shared/SpinnerLoading";

const DashboardUsers = () => {
  const { isPending, data } = useAdminUsers();
  return (
    <div>
      {isPending ? (
        <SpinnerLoading />
      ) : (
        <div>
          <ul className="grid grid-cols-4 border p-3 font-bold">
            <li>Name</li>
            <li>Email Address</li>
            <li>PhoneNo</li>
            <li>Role</li>
          </ul>
          {data?.map((item) => (
            <ul key={item.id} className="grid grid-cols-4 border p-2">
              <li>{item.name}</li>
              <li>{item.email ?? "null"}</li>
              <li>{item.phoneNo ?? "null"}</li>
              <li>{item.role}</li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardUsers;
