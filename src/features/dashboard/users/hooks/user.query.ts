import { useQuery } from "@tanstack/react-query";
import { adminUsers } from "../server/users.action";

export const useAdminUsers = () => {
  return useQuery({
    queryKey: ["admin_users"],
    queryFn: async () => await adminUsers(),
  });
};
