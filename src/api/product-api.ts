import { ProductResponse } from "@/types/product/product-response.type";
import axiosClient from "./axiosConfig";
import { ProductType } from "@/types/product/product.type";
import { multipleUpload } from "./photo-api";

export const getAllProduct = async (
  page?: number,
  value?: string
) => {
  const res = await axiosClient.get<ProductResponse>(
    `/Product${
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
  const res = await axiosClient.get<ProductType>(
    `/Product/${id}`
  );
  return res.data;
};

export const addProduct = async (
  data: Omit<ProductType, "productId" | "photos"> & {
    photos: string[];
  }
) => {
  const {
    productName,
    categoryId,
    description,
    inventory,
    price,
  } = data;
  const res = await axiosClient.post<{ id: number }>(
    "/Product",
    {
      productName,
      categoryId,
      description,
      inventory,
      price,
    }
  );
  const productId = res.data.id;
  data.photos.forEach(async (url) => {
    await axiosClient.post("/Photo", { productId, url });
  });
  return res.data;
};
export const updateProduct = async (
  productId: number,
  data: Omit<ProductType, "productId" | "photos"> & {
    photos: string[];
  }
) => {
  const res = await axiosClient.put<ProductType>(
    `/Product/${productId}`,
    data
  );
  await axiosClient.delete<{ success: boolean }>(
    `/Photo/${productId}`
  );
  data.photos.forEach(async (url) => {
    await axiosClient.post("/Photo", { productId, url });
  });
  return res.data;
};
export const deleteProduct = async (id: number) => {
  const res = await axiosClient.delete(`/Product/${id}`);
  return res.data;
};
