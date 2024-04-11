import { create } from "zustand";
import axios from "../api/axiosConfig";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface IData {
  data: {
    suppliers: any[];
    page: number;
    pageSize: number;
    pageCount: number;
    pageList: number[];
  };
  isLoading: boolean;
  GetData: () => void;
  NextPage: (currentPage: number) => void;
  PreviosPage: (currentPage: number) => void;
  ChangePage: (page: number) => void;
  AddNewSupplier: (
    supplierName: string,
    address: string,
    email: string,
    hotline: string
  ) => Promise<boolean>;
  UpdateSupplier: (
    supplierId: number,
    supplierName: string,
    address: string,
    email: string,
    hotline: string
  ) => Promise<boolean>;
  DeleteSupplier: (supplierId: number) => Promise<boolean>;
  GetById: (supplierId: number) => any;
  Search: (value: string) => void;
}
export const useSupplierStore = create<IData>((set) => ({
  data: {
    suppliers: [],
    page: 1,
    pageSize: 5,
    pageCount: 0,
    pageList: [],
  },
  isLoading: false,
  GetData: async () => {
    set({ isLoading: true });
    const res = await axios.get("/Supplier");
    set((state) => ({
      data: {
        suppliers: res.data.suppliers,
        page: res.data.page,
        pageSize: res.data.pageSize,
        pageCount: res.data.pageCount,
        pageList: Array.from(
          { length: res.data.pageCount },
          (_, i) => i + 1
        ),
      },
      isLoading: false,
    }));
  },
  NextPage: async (currentPage: number) => {
    set({ isLoading: true });
    const res = await axios.get(
      `/Supplier?page=${currentPage + 1}`
    );
    set((state) => ({
      data: {
        suppliers: res.data.suppliers,
        page: res.data.page,
        pageSize: res.data.pageSize,
        pageCount: res.data.pageCount,
        pageList: Array.from(
          { length: res.data.pageCount },
          (_, i) => i + 1
        ),
      },
      isLoading: false,
    }));
  },
  PreviosPage: async (currentPage: number) => {
    set({ isLoading: true });
    const res = await axios.get(
      `/Supplier?page=${currentPage - 1}`
    );
    set((state) => ({
      data: {
        suppliers: res.data.suppliers,
        page: res.data.page,
        pageSize: res.data.pageSize,
        pageCount: res.data.pageCount,
        pageList: Array.from(
          { length: res.data.pageCount },
          (_, i) => i + 1
        ),
      },
      isLoading: false,
    }));
  },
  ChangePage: async (page: number) => {
    set({ isLoading: true });
    const res = await axios.get(`/Supplier?page=${page}`);
    set((state) => ({
      data: {
        suppliers: res.data.suppliers,
        page: res.data.page,
        pageSize: res.data.pageSize,
        pageCount: res.data.pageCount,
        pageList: Array.from(
          { length: res.data.pageCount },
          (_, i) => i + 1
        ),
      },
      isLoading: false,
    }));
  },
  AddNewSupplier: async (
    supplierName: string,
    address: string,
    email: string,
    hotline: string
  ) => {
    try {
      set({ isLoading: true });
      const res = await axios.post(`/Supplier`, {
        supplierName,
        address,
        email,
        hotline,
      });
      if (res.status === 201) {
        set({ isLoading: false });
        toast.success("Successfull");
        return true;
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      const data: { message: string } | any =
        axiosError.response?.data;
      toast.error(data.message);
    }
    set({ isLoading: false });
    return false;
  },
  UpdateSupplier: async (
    supplierId: number,
    supplierName: string,
    address: string,
    email: string,
    hotline: string
  ) => {
    try {
      set({ isLoading: true });
      const res = await axios.put(
        `/Supplier/${supplierId}`,
        {
          supplierName,
          address,
          email,
          hotline,
        }
      );
      if (res.status === 200) {
        set({ isLoading: false });
        return true;
      }
    } catch (error) {
      console.log(error);
    }
    set({ isLoading: false });
    return false;
  },
  DeleteSupplier: async (supplierId: number) => {
    try {
      set({ isLoading: true });
      const res = await axios.delete(
        `/Supplier/${supplierId}`
      );
      if (res.status === 200) {
        set({ isLoading: false });
        return true;
      }
    } catch (error) {
      set({ isLoading: false });
      console.log(error);
    }
    set({ isLoading: false });
    return false;
  },
  GetById: async (supplierId: number) => {
    try {
      set({ isLoading: true });
      const res = await axios.get(
        `/Supplier/${supplierId}`
      );
      if (res.status === 200) {
        set({ isLoading: false });
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
    set({ isLoading: false });
    return null;
  },
  Search: async (value: string) => {},
}));
