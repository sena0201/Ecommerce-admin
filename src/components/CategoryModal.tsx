"use client";
import {
  addCategory,
  updateCategory,
} from "@/api/category-api";
import { useGetById } from "@/hooks/use-categories";
import { useGetAll } from "@/hooks/use-supplier";
import { CategoryResponse } from "@/types/category/category-response";
import { CategoryType } from "@/types/category/category.type";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";
import * as yup from "yup";

interface IProps {
  handleOpenModal: () => void;
  isUpdate: boolean | null;
  id?: number;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
  setCategoryId: Dispatch<SetStateAction<number>>;
  page: number;
  searchValue: string;
}

const categorySchema = yup.object().shape({
  categoryName: yup
    .string()
    .required("This field is required"),
  description: yup
    .string()
    .required("This field is required"),
  supplierId: yup
    .number()
    .positive("This field is required")
    .required("This field is required"),
});

type Data = Omit<CategoryType, "categoryId" | "products">;

function CategoryModal(props: IProps) {
  const {
    handleOpenModal,
    isUpdate,
    id,
    setIsUpdate,
    setCategoryId,
    page,
    searchValue,
  } = props;
  const { data: suppliers } = useGetAll();
  const { data: category } = useGetById(id);
  const queryClient = useQueryClient();
  const addCategoryMutation = useMutation({
    mutationFn: (data: Data) => addCategory(data),
    onSuccess: () => {
      handleCloseModal();
      queryClient.invalidateQueries({
        queryKey: ["categories", page, searchValue],
      });
      toast.success("Success");
    },
    onError: () => {
      toast.error("Error");
    },
  });
  const updateCategoryMutation = useMutation({
    mutationFn: (data: Data) =>
      updateCategory(id as number, data),
    onSuccess: () => {
      handleCloseModal();
      queryClient.invalidateQueries({
        queryKey: ["categories", page, searchValue],
      });
      toast.success("Success");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Error");
    },
  });
  const { handleSubmit, register, formState, setValue } =
    useForm({
      resolver: yupResolver(categorySchema),
    });
  useEffect(() => {
    if (category) {
      setValue("categoryName", category.categoryName);
      setValue("description", category.description);
      setValue("supplierId", category.supplierId);
    }
  }, [category, setValue]);
  const onSubmit = (data: Data) => {
    console.log(data);
    if (isUpdate) {
      updateCategoryMutation.mutate(data);
    } else {
      addCategoryMutation.mutate(data);
    }
  };
  const handleCloseModal = () => {
    setCategoryId(0);
    setIsUpdate(false);
    handleOpenModal();
  };
  return (
    <div className="absolute top-0 bottom-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 grid place-items-center">
      <div className="w-[500px] bg-white rounded-lg p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-primary">
            {isUpdate ? "Update" : "Add"} Category
          </h1>
          <button
            className="text-2xl"
            onClick={handleCloseModal}
          >
            <IoCloseSharp />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full mt-4">
            <label htmlFor="">Name</label> <br />
            <input
              type="text"
              id=""
              defaultValue={
                category ? category.categoryName : ""
              }
              className="border-2 border-grey rounded-lg outline-none p-2 w-full mt-2"
              {...register("categoryName")}
            />
            <br />
            {formState.errors && (
              <p className="text-red ml-2 mt-1">
                {formState.errors.categoryName?.message}
              </p>
            )}
          </div>
          <div className="w-full mt-4">
            <label htmlFor="">Description</label> <br />
            <textarea
              {...register("description")}
              id=""
              defaultValue={
                category && category.description !== null
                  ? category.description
                  : ""
              }
              className="border-2 border-grey rounded-lg outline-none p-2 w-full mt-2"
            ></textarea>
            <br />
            {formState.errors && (
              <p className="text-red ml-2 mt-1">
                {formState.errors.description?.message}
              </p>
            )}
          </div>
          <div className="w-full mt-4">
            <select
              className="w-full border-2 border-grey rounded-lg outline-none px-2 py-3"
              {...register("supplierId")}
              defaultValue={category?.supplierId}
            >
              <option value="0">Select Supplier</option>
              {suppliers?.map((supplier: any) => (
                <option
                  key={supplier.supplierId}
                  value={supplier.supplierId}
                >
                  {supplier.supplierName}
                </option>
              ))}
            </select>
            {formState.errors && (
              <p className="text-red ml-2 mt-1">
                {formState.errors.supplierId?.message}
              </p>
            )}
          </div>
          <button className="w-full bg-primary py-4 rounded-lg text-white mt-4 flex justify-center items-center gap-2">
            {addCategoryMutation.isPending && (
              <MoonLoader
                size={30}
                color="#ffffff"
                speedMultiplier={0.5}
              />
            )}
            {isUpdate ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CategoryModal;
