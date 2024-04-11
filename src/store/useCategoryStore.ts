import { create } from "zustand";
import axios from "../api/axiosConfig";
import { toast } from "react-toastify";

type IData = {
  data: {
    categories: [];
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
  AddNewCategory: (
    categoryName: string,
    description: string
  ) => Promise<boolean>;
  UpdateCategory: (
    categoryId: number,
    categoryName: string,
    description: string
  ) => Promise<boolean>;
  DeleteCategory: (categoryId: number) => Promise<boolean>;
  GetById: (categoryId: number) => any;
  Search: (value: string) => void;
};

export type CategoryApi = {
  categoryName: string;
  description: string;
};

export const useCategoryStore = create<IData>((set) => ({
  data: {
    categories: [],
    page: 1,
    pageSize: 5,
    pageCount: 0,
    pageList: [],
  },
  isLoading: false,
  GetData: async () => {
    set({ isLoading: true });
    const res = await axios.get("/Category");
    set((state) => ({
      data: {
        categories: res.data.categories,
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
      `/Category?page=${currentPage + 1}`
    );
    set((state) => ({
      data: {
        categories: res.data.categories,
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
      `/Category?page=${currentPage - 1}`
    );
    set((state) => ({
      data: {
        categories: res.data.categories,
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
    const res = await axios.get(`/Category?page=${page}`);
    set((state) => ({
      data: {
        categories: res.data.categories,
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
  AddNewCategory: async (
    categoryName: string,
    description: string
  ) => {
    try {
      set({ isLoading: true });
      const res = await axios.post(`/Category`, {
        categoryName,
        description,
      });
      if (res.status === 201) {
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
  UpdateCategory: async (
    categoryId: number,
    categoryName: string,
    description: string
  ) => {
    try {
      set({ isLoading: true });
      const res = await axios.put(
        `/Category/${categoryId}`,
        {
          categoryName,
          description,
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
  DeleteCategory: async (categoryId: number) => {
    try {
      set({ isLoading: true });
      const res = await axios.delete(
        `/Category/${categoryId}`
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
  GetById: async (categoryId: number) => {
    try {
      set({ isLoading: true });
      const res = await axios.get(
        `/Category/${categoryId}`
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
  Search: async (value: string) => {
    try {
      set({ isLoading: true });
      const res = await axios.get(
        `/Category?searchValue=${value}`
      );
      if (res.status === 200) {
        set({
          data: {
            categories: res.data.categories,
            page: res.data.page,
            pageSize: res.data.pageSize,
            pageCount: res.data.pageCount,
            pageList: Array.from(
              { length: res.data.pageCount },
              (_, i) => i + 1
            ),
          },
          isLoading: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
    set({ isLoading: false });
  },
}));
