import {
  addSupplier,
  updateSupplier,
} from "@/api/supplier-api";
import { useGetById } from "@/hooks/use-supplier";
import { SupplierType } from "@/types/supplier/supplier.type";
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
  supplierId?: number;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
  setSupplierId: Dispatch<
    SetStateAction<number | undefined>
  >;
  page?: number;
  searchValue?: string;
}

const supplierSchema = yup.object().shape({
  supplierName: yup
    .string()
    .required("This field is required"),
  address: yup.string().required("This field is required"),
  email: yup
    .string()
    .email()
    .required("This field is required"),
  hotline: yup.string().required("This field is required"),
});

type Data = Omit<SupplierType, "supplierId" | "categories">;

function SupplierModal(props: IProps) {
  const {
    handleOpenModal,
    isUpdate,
    supplierId,
    setIsUpdate,
    setSupplierId,
    page,
    searchValue,
  } = props;

  const queryClient = useQueryClient();
  const { data: supplier, isLoading } =
    useGetById(supplierId);
  const addSupplierMutation = useMutation({
    mutationFn: (data: Data) => addSupplier(data),
    onSuccess: () => {
      handleCloseModal();
      queryClient.invalidateQueries({
        queryKey: ["suppliers", page, searchValue],
      });
      toast.success("Add supplier success");
    },
    onError: () => {
      toast.error("Error");
    },
  });
  const updateSupplierMutation = useMutation({
    mutationFn: (data: Data) =>
      updateSupplier(supplierId as number, data),
    onSuccess: () => {
      handleCloseModal();
      queryClient.invalidateQueries({
        queryKey: ["suppliers", page, searchValue],
      });
      toast.success("Update supplier success");
    },
    onError: () => {
      toast.error("Error");
    },
  });

  const { handleSubmit, register, formState, setValue } =
    useForm({
      resolver: yupResolver(supplierSchema),
    });
  useEffect(() => {
    if (supplier) {
      setValue("supplierName", supplier.supplierName);
      setValue("address", supplier.address);
      setValue("email", supplier.email);
      setValue("hotline", supplier.hotline);
    }
  }, [supplier, setValue]);

  const handleCloseModal = () => {
    setSupplierId(undefined);
    setIsUpdate(false);
    handleOpenModal();
  };
  const onSubmit = (data: Data) => {
    if (!isUpdate) {
      addSupplierMutation.mutate(data);
    } else {
      updateSupplierMutation.mutate(data);
    }
  };
  return (
    <div className="absolute top-0 bottom-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 grid place-items-center">
      <div className="w-[500px] bg-white rounded-lg p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-primary">
            {isUpdate ? "Update" : "Add"} Supplier
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
                supplier ? supplier?.supplierName : ""
              }
              className="border-2 border-grey rounded-lg outline-none p-2 w-full mt-2"
              {...register("supplierName")}
            />
            <br />
            {formState.errors && (
              <p className="text-red ml-2 mt-1">
                {formState.errors.supplierName?.message}
              </p>
            )}
          </div>
          <div className="w-full mt-4">
            <label htmlFor="">Address</label> <br />
            <input
              type="text"
              id=""
              defaultValue={
                supplier ? supplier?.address : ""
              }
              className="border-2 border-grey rounded-lg outline-none p-2 w-full mt-2"
              {...register("address")}
            />
            <br />
            {formState.errors && (
              <p className="text-red ml-2 mt-1">
                {formState.errors.address?.message}
              </p>
            )}
          </div>
          <div className="w-full mt-4">
            <label htmlFor="">Email</label> <br />
            <input
              type="email"
              id=""
              defaultValue={supplier ? supplier?.email : ""}
              className="border-2 border-grey rounded-lg outline-none p-2 w-full mt-2"
              {...register("email")}
            />
            <br />
            {formState.errors && (
              <p className="text-red ml-2 mt-1">
                {formState.errors.email?.message}
              </p>
            )}
          </div>
          <div className="w-full mt-4">
            <label htmlFor="">Hotline</label> <br />
            <input
              type="text"
              id=""
              defaultValue={
                supplier ? supplier?.hotline : ""
              }
              className="border-2 border-grey rounded-lg outline-none p-2 w-full mt-2"
              {...register("hotline")}
            />
            <br />
            {formState.errors && (
              <p className="text-red ml-2 mt-1">
                {formState.errors.hotline?.message}
              </p>
            )}
          </div>
          <button className="w-full bg-primary py-4 rounded-lg text-white mt-4 flex justify-center items-center gap-2">
            {addSupplierMutation.isPending && (
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

export default SupplierModal;
