"use client";
import { deleteCategory } from "@/api/category-api";
import CategoryModal from "@/components/CategoryModal";
import List from "@/components/List";
import { useCategories } from "@/hooks/use-categories";
import { CategoryType } from "@/types/category/category.type";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";

function CategoryPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] =
    useState<string>("");
  const { data, isLoading, error } = useCategories(
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

  const deleteCategoryMutation = useMutation({
    mutationFn: (data: number) => deleteCategory(data),
    onSuccess: () => {
      toast.success("Delete successfully");
      queryClient.invalidateQueries({
        queryKey: ["categories", page, searchValue],
      });
    },
    onError: () => {
      toast.error("Error deleting category");
    },
  });

  const handleUpdate = (id: number) => {
    setCategoryId(id);
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
        <CategoryModal
          handleOpenModal={handleOpenModal}
          isUpdate={isUpdate ? isUpdate : null}
          id={isUpdate ? categoryId : undefined}
          setIsUpdate={setIsUpdate}
          setCategoryId={setCategoryId}
          page={page}
          searchValue={searchValue}
        />
      )}
      <h1 className="text-4xl font-semibold text-primary">
        Category
      </h1>
      <p className="text-grey font-semibold mt-2">
        View all category
      </p>
      <List
        page={page}
        pageSize={pageSize}
        pageCount={pageCount}
        pageList={pageList}
        handleOpenModal={handleOpenModal}
        title="Category"
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
                <th className="text-start pb-2 block w-[500px]">
                  Description
                </th>
                <th className="pb-2">Option</th>
              </tr>
            </thead>
            <tbody>
              {data?.categories?.map(
                (category: CategoryType) => (
                  <tr
                    className=""
                    key={category.categoryId}
                  >
                    <td className="text-center">
                      <input
                        type="checkbox"
                        className="w-[20px] h-[20px] m-2"
                      />
                    </td>
                    <td className="text-center w-[100px]">
                      {category.categoryId}
                    </td>
                    <td className="truncate">
                      {category.categoryName}
                    </td>
                    <td className="truncate block w-[500px]">
                      {category.description}
                    </td>
                    <td className="text-center">
                      <div className="flex justify-center relative group">
                        <BsThreeDotsVertical />
                        <div className="absolute top-4 right-1/2 hidden group-hover:block bg-white shadow-xl z-40">
                          <button
                            className="px-4 py-2 w-full text-white bg-yellow-300"
                            onClick={() =>
                              handleUpdate(
                                category.categoryId
                              )
                            }
                          >
                            Update
                          </button>
                          <button
                            className="px-4 py-2 w-full text-white bg-red"
                            onClick={() =>
                              deleteCategoryMutation.mutate(
                                category.categoryId
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

export default CategoryPage;
