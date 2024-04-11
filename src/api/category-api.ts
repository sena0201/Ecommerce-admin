import { CategoryResponse } from "@/types/category/category-response";
import { CategoryType } from "../types/category/category.type";
import axiosClient from "./axiosConfig";

export const getAll = async () => {
  const res = await axiosClient.get("/allcategories");
  return res.data;
};

export const getCategories = async (
  page?: number,
  value?: string
) => {
  const res = await axiosClient.get(
    `/Category${
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
  const res = await axiosClient.get<CategoryType>(
    `/Category/${id}`
  );
  return res.data;
};

export const addCategory = async (
  data: Omit<CategoryType, "categoryId" | "products">
) => {
  const res = await axiosClient.post("/Category", data);
  return res.data;
};

export const updateCategory = async (
  id: number,
  data: Omit<CategoryType, "categoryId" | "products">
) => {
  const res = await axiosClient.put(
    `/Category/${id}`,
    data
  );
  return res.data;
};

export const deleteCategory = async (id: number) => {
  const res = await axiosClient.delete(`/Category/${id}`);
  return res.data;
};

export const searchCategory = async (value: string) => {
  const res = await axiosClient.get(
    `/Category?searchValue=${value}`
  );
  return res.data;
};
