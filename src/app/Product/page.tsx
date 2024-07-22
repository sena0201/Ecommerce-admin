"use client";

import { deleteProduct } from "@/api/product-api";
import Modal from "@/components/CategoryModal";
import List from "@/components/List";
import ProductModal from "@/components/ProductModal";
import { useProducts } from "@/hooks/use-product";
import { ProductType } from "@/types/product/product.type";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";

function ProductPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [productId, setProductId] = useState<number>();
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] =
    useState<string>("");
  const { data, isLoading, error } = useProducts(
    page,
    searchValue
  );
  const queryClient = useQueryClient();
  const router = useRouter();

  const [pageSize, setPageSize] = useState<number>(5);
  const [pageCount, setPageCount] = useState<number>(0);
  const [pageList, setPageList] = useState<number[]>([]);

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };
  const handleOpenDetail = (id: number) => {
    router.push(`/Product/${id}`);
  };

  const deleteProductMutation = useMutation({
    mutationFn: (data: number) => deleteProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products", page, searchValue],
      });
    },
    onError: () => {
      toast.error("Error");
    },
  });

  const handleUpdate = (id: number) => {
    setProductId(id);
    setIsUpdate(!isUpdate);
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    setPageSize(data?.pageSize ? data?.pageSize : 5);
    setPageCount(data?.pageCount ? data?.pageCount : 0);
    setPageList(
      Array.from(
        { length: data?.pageCount ? data?.pageCount : 0 },
        (_, i) => i + 1
      )
    );
  }, [data]);
  if (error) {
    return <>500</>;
  }

  return (
    <div>
      {isOpen && (
        <ProductModal
          handleOpenModal={handleOpenModal}
          isUpdate={isUpdate ? isUpdate : null}
          id={isUpdate ? productId : undefined}
          setIsUpdate={setIsUpdate}
          setProductId={setProductId}
          page={page}
          searchValue={searchValue}
        />
      )}
      <h1 className="text-4xl font-semibold text-primary">
        Product
      </h1>
      <p className="text-grey font-semibold mt-2">
        View all product
      </p>
      <List
        page={page}
        pageSize={pageSize}
        pageCount={pageCount}
        pageList={pageList}
        handleOpenModal={handleOpenModal}
        title="Product"
        setPage={setPage}
        setSearchValue={setSearchValue}
      >
        {isLoading && (
          <div className="flex justify-center mt-5">
            <MoonLoader
              color="#280559"
              speedMultiplier={0.5}
            />
          </div>
        )}
        {!isLoading && (
          <table className="w-full my-5 text-[18px]">
            <thead className="text-grey">
              <tr>
                <th className="pb-2">
                  <input
                    type="checkbox"
                    className="w-[20px] h-[20px] border-2 border-grey"
                  />
                </th>
                <th className="pb-2 w-[100px]">#</th>
                <th className="text-start pb-2">Name</th>
                <th className="text-start pb-2">Price</th>
                <th className="text-start pb-2 block w-[300px]">
                  Description
                </th>
                <th className="text-start pb-2">
                  Inventory
                </th>

                <th className="pb-2">Option</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map(
                (product: ProductType) => (
                  <tr className="" key={product.productId}>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        className="w-[20px] h-[20px] m-2"
                      />
                    </td>
                    <td className="text-center w-[100px]">
                      {product.productId}
                    </td>
                    <td className="truncate">
                      {product.productName}
                    </td>
                    <td className="truncate">
                      {product.price}
                    </td>
                    <td className="truncate mt-1 block max-w-[400px]">
                      {product.description}
                    </td>
                    <td className="truncate">
                      {product.inventory}
                    </td>
                    {/* <td className="flex justify-center">
                      <button
                        className="border-2 border-primary rounded-3xl px-2 py-1 text-primary hover:bg-primary hover:text-white"
                        onClick={() =>
                          handleOpenDetail(
                            product.productId
                          )
                        }
                      >
                        View
                      </button>
                    </td> */}
                    <td className="text-center">
                      <div className="flex justify-center relative group">
                        <BsThreeDotsVertical />
                        <div className="absolute top-4 right-1/2 hidden group-hover:block bg-white shadow-xl z-40">
                          <button
                            className="px-4 py-2 w-full text-white bg-yellow-300"
                            onClick={() =>
                              handleUpdate(
                                product.productId
                              )
                            }
                          >
                            Update
                          </button>
                          <button
                            className="px-4 py-2 w-full text-white bg-red"
                            onClick={() =>
                              deleteProductMutation.mutate(
                                product.productId
                              )
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </List>
    </div>
  );
}

export default ProductPage;
