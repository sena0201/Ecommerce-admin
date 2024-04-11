import { SupplierResponse } from "@/types/supplier/supplier-response.type";
import axiosClient from "./axiosConfig";
import { SupplierType } from "@/types/supplier/supplier.type";

export const getAll = async () => {
  const res = await axiosClient.get("/allsupplier");
  return res.data;
};

export const getAllSupplier = async (
  page?: number,
  value?: string
) => {
  const res = await axiosClient.get<SupplierResponse>(
    `/Supplier${
      page && value
        ? "?page=" + page + "&searchValue=" + value
        : page && !value && page > 1
        ? "?page=" + page
        : value && !page
        ? "?searchValue=" + value
        : ""
    }`
  );
  return res.data;
};

export const getById = async (id: number) => {
  const res = await axiosClient.get<SupplierType>(
    `/Supplier/${id}`
  );
  return res.data;
};

export const addSupplier = async (
  data: Omit<SupplierType, "supplierId" | "categories">
) => {
  const res = await axiosClient.post<SupplierType>(
    "/Supplier",
    data
  );
  return res.data;
};
export const updateSupplier = async (
  id: number,
  data: Omit<SupplierType, "supplierId" | "categories">
) => {
  const res = await axiosClient.put<SupplierType>(
    `/Supplier/${id}`,
    data
  );
  return res.data;
};
export const deleteSupplier = async (id: number) => {
  const res = await axiosClient.delete(`/Supplier/${id}`);
  return res.data;
};
export const searchSupplier = async (value: string) => {
  const res = await axiosClient.get(
    `/Supplier?searchValue=${value}`
  );
  return res.data;
};
