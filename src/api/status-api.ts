import { StatusType } from "@/types/status/status.type";
import axiosClient from "./axiosConfig";

export const getStatuses = async () => {
  const res = await axiosClient.get<StatusType[]>(
    "/Status"
  );
  return res.data;
};
