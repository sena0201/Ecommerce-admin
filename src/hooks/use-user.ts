import { getUser } from "@/api/user-api";
import { useQuery } from "@tanstack/react-query";

export const useUser = (userId?: number) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => getUser(userId),
  });
};
