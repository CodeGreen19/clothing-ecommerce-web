"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { userOrders } from "../../server/orders.action";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils"; // optional helper for conditional classes

const statusColorMap: Record<string, string> = {
  pending: "bg-yellow-200 text-yellow-800",
  confirmed: "bg-blue-200 text-blue-800",
  shipped: "bg-orange-200 text-orange-800",
  delivered: "bg-green-200 text-green-800",
  cancelled: "bg-red-200 text-red-800",
  returned: "bg-purple-200 text-purple-800",
  failed: "bg-gray-200 text-gray-800",
};

const AccountOrders = () => {
  const { isPending, data } = useQuery({
    queryKey: ["user_orders"],
    queryFn: async () => await userOrders(),
  });

  if (data && "error" in data) {
    return <div className="text-red-500">{data.error}</div>;
  }

  return (
    <div className="container mx-auto max-w-4xl py-10">
      <h2 className="mb-6 text-2xl font-bold">Your Orders</h2>

      {isPending ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      ) : data && data.length > 0 ? (
        <div className="space-y-6">
          {data.map((order) => (
            <Card key={order.id} className="border border-muted">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">
                  Transjunction Id : #{order.transId}
                </CardTitle>
                <Badge
                  className={cn(
                    "capitalize",
                    statusColorMap[order.orderStatus],
                  )}
                >
                  {order.orderStatus}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Customer</span>
                  <span className="text-primary">{order.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phone</span>
                  <span>{order.phoneNo}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount</span>
                  <span>৳ {order.totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Updated</span>
                  <span>
                    {formatDistanceToNow(new Date(order.updatedAt))} ago
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          No orders found.
        </div>
      )}
    </div>
  );
};

export default AccountOrders;
