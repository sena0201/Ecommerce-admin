"use client";
import { deleteSupplier } from "@/api/supplier-api";
import List from "@/components/List";
import SupplierModal from "@/components/SupplierModal";
import { useSuppliers } from "@/hooks/use-supplier";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";

function SupplierPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [supplierId, setSupplierId] = useState<number>();
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] =
    useState<string>("");
  const { data, isLoading, error } = useSuppliers(
    page,
    searchValue
  );
  const queryClient = useQueryClient();

  const [pageSize, setPageSize] = useState<number>(5);
  const [pageCount, setPageCount] = useState<number>(0);
  const [pageList, setPageList] = useState<number[]>([]);

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  const deleteSupplierMutation = useMutation({
    mutationFn: (data: number) => deleteSupplier(data),
    onSuccess: () => {
      toast.success("Delete successfully");
      queryClient.invalidateQueries({
        queryKey: ["suppliers", page],
      });
    },
    onError: () => {
      toast.error("Error deleting supplier");
    },
  });

  const handleUpdate = (id: number) => {
    setSupplierId(id);
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
        <SupplierModal
          handleOpenModal={handleOpenModal}
          isUpdate={isUpdate ? isUpdate : null}
          supplierId={supplierId}
          setIsUpdate={setIsUpdate}
          setSupplierId={setSupplierId}
          page={page}
          searchValue={searchValue}
        />
      )}
      <h1 className="text-4xl font-semibold text-primary">
        Supplier
      </h1>
      <p className="text-grey font-semibold mt-2">
        View all supplier
      </p>
      <List
        page={page}
        pageSize={pageSize}
        pageCount={pageCount}
        pageList={pageList}
        handleOpenModal={handleOpenModal}
        title="Supplier"
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
                <th className="text-start pb-2">Address</th>
                <th className="text-start pb-2">Email</th>
                <th className="text-start pb-2">Hotline</th>
                <th className="pb-2">Option</th>
              </tr>
            </thead>
            <tbody>
              {data?.suppliers?.map((supplier) => (
                <tr className="" key={supplier.supplierId}>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px] m-2"
                    />
                  </td>
                  <td className="text-center w-[100px]">
                    {supplier.supplierId}
                  </td>
                  <td className="truncate">
                    {supplier.supplierName}
                  </td>
                  <td className="truncate">
                    {supplier.address}
                  </td>
                  <td className="truncate">
                    {supplier.email}
                  </td>
                  <td className="truncate">
                    {supplier.hotline}
                  </td>
                  <td className="text-center">
                    <div className="flex justify-center relative group">
                      <BsThreeDotsVertical />
                      <div className="absolute top-4 right-1/2 hidden group-hover:block bg-white shadow-xl z-40">
                        <button
                          className="px-4 py-2 w-full text-white bg-yellow-300"
                          onClick={() =>
                            handleUpdate(
                              supplier.supplierId
                            )
                          }
                        >
                          Update
                        </button>
                        <button
                          className="px-4 py-2 w-full text-white bg-red"
                          onClick={() =>
                            deleteSupplierMutation.mutate(
                              supplier.supplierId
                            )
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </List>
    </div>
  );
}

export default SupplierPage;
