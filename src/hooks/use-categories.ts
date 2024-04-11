import {
  getAll,
  getById,
  getCategories,
} from "@/api/category-api";
import { useQuery } from "@tanstack/react-query";

export const useCategories = (
  page?: number,
  value?: string
) => {
  return useQuery({
    queryKey: ["categories", page ? page : 1, value],
    queryFn: async () => await getCategories(page, value),
    staleTime: 0,
    gcTime: 10,
  });
};

export const useGetById = (id?: number) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getById(id as number),
    enabled: id !== undefined,
  });
};

export const useGetAll = () =>
  useQuery({
    queryKey: ["categories", "all"],
    queryFn: () => getAll(),
    staleTime: 5 * 60 * 1000,
  });
