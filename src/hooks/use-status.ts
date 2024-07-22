import { getStatuses } from "@/api/status-api";
import { useQuery } from "@tanstack/react-query";

export const useStatus = () => {
  return useQuery({
    queryKey: ["statuses"],
    queryFn: () => getStatuses(),
  });
};
