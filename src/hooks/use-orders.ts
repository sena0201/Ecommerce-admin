import { getAllOrder, getOrder } from "@/api/order-api";
import { useQuery } from "@tanstack/react-query";

export const useOrders = (
  page?: number,
  value?: string
) => {
  return useQuery({
    queryKey: ["orders", page ? page : 1],
    queryFn: async () => await getAllOrder(page),
    staleTime: 0,
  });
};
export const useGetOrder = (orderId: number) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => await getOrder(orderId),
  });
};
