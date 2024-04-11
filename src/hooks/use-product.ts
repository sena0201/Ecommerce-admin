import { getAllProduct, getById } from "@/api/product-api";
import { useQuery } from "@tanstack/react-query";

export const useProducts = (
  page?: number,
  value?: string
) => {
  return useQuery({
    queryKey: ["products", page ? page : 1, value],
    queryFn: async () => await getAllProduct(page, value),
    staleTime: 0,
  });
};

export const useGetById = (id?: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getById(id as number),
    enabled: id !== undefined,
  });
};
