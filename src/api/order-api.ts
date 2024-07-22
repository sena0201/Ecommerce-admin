import { OrderResponse } from "@/types/order/order-response.type";
import axiosClient from "./axiosConfig";
import { OrderType } from "@/types/order/order.type";

export const getAllOrder = async (
  page?: number,
  value?: string
) => {
  const res = await axiosClient.get<OrderResponse>(
    `/Order${
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

export const getOrder = async (orderId: number) => {
  const res = await axiosClient.get<OrderType>(
    `/Order/${orderId}`
  );
  return res.data;
};
export const updateOrder = async (
  orderId: number,
  statusId: number
) => {
  const res = await axiosClient.put(`/Order/${orderId}`, {
    statusId,
  });
  return res.data;
};
