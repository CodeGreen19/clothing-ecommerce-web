import { useQuery } from "@tanstack/react-query";
import { adminOrders } from "../server/order.action";

export const useAdminOrders = () => {
  return useQuery({
    queryKey: ["admin_orders"],
    queryFn: async () => await adminOrders(),
  });
};
