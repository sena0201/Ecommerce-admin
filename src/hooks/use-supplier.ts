import {
  getAll,
  getAllSupplier,
  getById,
} from "@/api/supplier-api";
import { useQuery } from "@tanstack/react-query";

export const useGetAll = () =>
  useQuery({
    queryKey: ["suppliers", "all"],
    queryFn: () => getAll(),
    staleTime: 5 * 60 * 1000,
  });

export const useSuppliers = (
  page?: number,
  value?: string
) => {
  return useQuery({
    queryKey: ["suppliers", page, value],
    queryFn: () => getAllSupplier(page, value),
    staleTime: 0,
  });
};

export const useGetById = (id?: number) => {
  return useQuery({
    queryKey: ["supplier", id],
    queryFn: () => getById(id as number),
    enabled: id !== undefined,
  });
};
