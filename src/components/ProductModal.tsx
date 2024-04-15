import { SERVER_NAME } from "@/api/axiosConfig";
import { deletePhoto, upload } from "@/api/photo-api";
import {
  addProduct,
  updateProduct,
} from "@/api/product-api";
import { useGetAll } from "@/hooks/use-categories";
import { useGetById } from "@/hooks/use-product";
import { PhotoType } from "@/types/photo/photo.type";
import { ProductType } from "@/types/product/product.type";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";
import * as yup from "yup";

interface IProps {
  handleOpenModal: () => void;
  isUpdate: boolean | null;
  id?: number;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
  setProductId: Dispatch<
    SetStateAction<number | undefined>
  >;
  page?: number;
  searchValue?: string;
}

type CreateData = Omit<
  ProductType,
  "productId" | "photos"
> & { photos: string[] };

type UpdateData = Omit<
  ProductType,
  "productId" | "photos"
> & { photos: string[] };
type Data = Omit<ProductType, "productId" | "photos">;

const productSchema = yup.object().shape({
  productName: yup
    .string()
    .required("This field is required"),
  price: yup.number().required("This field is required"),
  description: yup
    .string()
    .required("This field is required"),
  inventory: yup
    .number()
    .required("This field is required"),
  categoryId: yup
    .number()
    .required("This field is required"),
});

function ProductModal({
  handleOpenModal,
  isUpdate,
  id,
  setIsUpdate,
  setProductId,
  page,
  searchValue,
}: IProps) {
  const [imageList, setImageList] = useState<string[]>([]);

  const { handleSubmit, register, formState } = useForm({
    resolver: yupResolver<Data>(productSchema),
  });

  const { data: product } = useGetById(id);
  const { data: categories } = useGetAll();
  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: (data: CreateData) => addProduct(data),
    onSuccess: async () => {
      handleOpenModal();
      await queryClient.invalidateQueries({
        queryKey: ["products", page, searchValue],
      });
      toast.success("Add product success");
    },
    onError: (err) => {
      const axiosError = err as AxiosError;
      if (axiosError) {
        toast.error("Error");
      }
    },
  });
  const updateProductMutation = useMutation({
    mutationFn: (data: UpdateData) =>
      updateProduct(id as number, data),
    onSuccess: () => {
      handleCloseModal();
      queryClient.invalidateQueries({
        queryKey: ["products", page, searchValue],
      });
      toast.success("Update product success");
    },
    onError: (err) => {
      const axiosError = err as AxiosError;
      if (axiosError) {
        toast.error("Error");
      }
    },
  });

  const uploadPhotoMutation = useMutation({
    mutationFn: (data: File) => upload(data),
    onSuccess: (data) => {
      setImageList([...imageList, data]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const deletePhotoMutation = useMutation({
    mutationFn: (data: string) => deletePhoto(data),
    onSuccess: (data) => {
      setImageList(
        imageList.filter((image) => image !== data)
      );
    },
    onError: (error) => {},
  });
  useEffect(() => {
    setImageList(
      product ? product?.photos.map((p) => p.url) : []
    );
  }, [product]);

  const handleDeleteImage = async (id: string) => {
    await deletePhotoMutation.mutateAsync(id);
  };

  const handleUpload = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadPhotoMutation.mutateAsync(file);
    }
  };
  const handleCloseModal = () => {
    setProductId(undefined);
    setIsUpdate(false);
    setImageList([]);
    handleOpenModal();
  };

  const onSubmit = (data: Data) => {
    if (!isUpdate) {
      if (imageList.length > 0) {
        addProductMutation.mutate({
          ...data,
          photos: imageList,
        });
      } else {
        toast.warning("Please select photo");
      }
    } else {
      if (imageList.length > 0) {
        updateProductMutation.mutate({
          ...data,
          photos: imageList,
        });
      } else {
        toast.warning("Please select photo");
      }
    }
  };

  return (
    <div className="absolute top-0 bottom-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 grid place-items-center">
      <div className="w-[750px] bg-white rounded-lg p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-primary">
            {isUpdate ? "Update" : "Add"} Product
          </h1>
          <button
            className="text-2xl"
            onClick={handleCloseModal}
          >
            <IoCloseSharp />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2">
            <div className="w-full mt-4">
              <label htmlFor="">Name</label> <br />
              <input
                type="text"
                id=""
                defaultValue={
                  product ? product.productName : ""
                }
                className="border-2 border-grey rounded-lg outline-none p-3 w-full mt-2"
                {...register("productName")}
              />
              <br />
              {formState.errors && (
                <p className="text-red text-xs ml-2 mt-1">
                  {formState.errors.productName?.message}
                </p>
              )}
            </div>
            <div className="w-[300px] mt-4">
              <label htmlFor="">Price</label> <br />
              <input
                type="text"
                id=""
                defaultValue={product ? product.price : ""}
                className="border-2 border-grey rounded-lg outline-none p-3 w-full mt-2"
                {...register("price")}
              />
              <br />
              {formState.errors && (
                <p className="text-red text-xs ml-2 mt-1">
                  {formState.errors.price?.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-4 h-full">
            <label htmlFor="">Description</label> <br />
            <textarea
              {...register("description")}
              id=""
              defaultValue={
                product && product.description !== null
                  ? product.description
                  : ""
              }
              className="border-2 border-grey rounded-lg outline-none p-2 w-full mt-2"
            ></textarea>
            <br />
            {formState.errors && (
              <p className="text-red text-xs ml-2 mt-1">
                {formState.errors.description?.message}
              </p>
            )}
          </div>
          <div className="w-full mt-4">
            <label htmlFor="">Inventory</label> <br />
            <input
              type="text"
              id=""
              defaultValue={
                product ? product.inventory : ""
              }
              className="border-2 border-grey rounded-lg outline-none p-3 w-full mt-2"
              {...register("inventory")}
            />
            <br />
            {formState.errors && (
              <p className="text-red text-xs ml-2 mt-1">
                {formState.errors.inventory?.message}
              </p>
            )}
          </div>
          <select
            className="w-full border-2 border-grey rounded-lg outline-none px-2 py-3 mt-4"
            {...register("categoryId")}
            value={product?.categoryId}
          >
            <option value="0">Select Category</option>
            {categories?.map((category: any) => (
              <option
                key={category.categoryId}
                value={category.categoryId}
              >
                {category.categoryName}
              </option>
            ))}
          </select>
          {formState.errors && (
            <p className="text-red ml-2 mt-1">
              {formState.errors.categoryId?.message}
            </p>
          )}
          <div className="mt-4">
            <input
              type="file"
              multiple
              onChange={handleUpload}
              className="bg-transparent"
            />
            <div className="flex flex-wrap gap-4 mt-2">
              {imageList.length > 0 &&
                imageList.map((image) => (
                  <div
                    key={Math.random()}
                    className="w-[150px] h-[150px] relative"
                  >
                    <div className="absolute -top-3 -right-3 text-2xl hover:cursor-pointer">
                      <span
                        onClick={() =>
                          handleDeleteImage(image)
                        }
                      >
                        <IoIosCloseCircleOutline />
                      </span>
                    </div>
                    <Image
                      src={SERVER_NAME + image}
                      alt=""
                      width={100}
                      height={100}
                      className="w-full h-full"
                    />
                  </div>
                ))}
            </div>
          </div>
          <button className="w-full bg-primary py-4 rounded-lg text-white mt-4 flex justify-center items-center gap-2">
            {addProductMutation.isPending && (
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

export default ProductModal;
