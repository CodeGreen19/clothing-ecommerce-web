"use client";

import React from "react";
import SpinnerLoading from "../../shared/SpinnerLoading";
import { useAdminOrders } from "../hooks/order.query";

const DashboardOrders = () => {
  const { isPending, data } = useAdminOrders();
  return (
    <div>
      {isPending ? (
        <SpinnerLoading />
      ) : (
        <div>
          <ul className="grid grid-cols-7 border p-3 font-bold">
            <li>Name</li>
            <li>phoneNo</li>
            <li>transId</li>
            <li>Method</li>
            <li>Place of Dhaka</li>
            <li>Total Amount</li>
            <li>status</li>
          </ul>
          {data?.map((item) => (
            <ul key={item.id} className="grid grid-cols-7 border p-2">
              <li>{item.name}</li>
              <li>{item.phoneNo}</li>
              <li>{item.transId}</li>
              <li>{item.deliveryMethod}</li>
              <li>{item.deliveryPlace}</li>
              <li>{item.totalAmount}</li>
              <li>{item.orderStatus}</li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardOrders;
