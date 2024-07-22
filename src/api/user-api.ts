import { UserType } from "@/types/user/user.type";
import axiosClient from "./axiosConfig";

export const getUser = async (userId?: number) => {
  const res = await axiosClient.get<UserType>(
    `/User/${userId}`
  );
  return res.data;
};
