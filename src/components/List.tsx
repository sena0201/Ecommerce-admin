import { useCategoryStore } from "@/store/useCategoryStore";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiPrinter } from "react-icons/fi";
import {
  IoAddCircleSharp,
  IoFilter,
} from "react-icons/io5";
import { LuSearch } from "react-icons/lu";

interface IList {
  children?: Readonly<React.ReactNode>;
  page: number;
  pageSize: number;
  pageCount: number;
  pageList: number[];
  handleOpenModal?: () => void;
  title: string;
  setPage: Dispatch<SetStateAction<number>>;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

function List({
  children,
  page,
  pageSize,
  pageCount,
  pageList,
  handleOpenModal,
  title,
  setPage,
  setSearchValue,
}: IList) {
  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePrevPage = () => {
    setPage(page - 1);
  };
  const handleSelectPage = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    setPage(parseInt(e.target.value));
  };
  const Search = useCategoryStore((state) => state.Search);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className="mt-5 bg-white p-8 rounded-3xl min-h-[500px] flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          List of {title}
        </h1>
        {title !== "Order" && (
          <button
            className="flex gap-2 items-center py-5 px-6 bg-primary text-white rounded-2xl"
            onClick={handleOpenModal}
          >
            <IoAddCircleSharp />
            <span>Add New {title}</span>
          </button>
        )}
      </div>
      <div className="p-8 bg-link-hover mt-6 flex gap-2 rounded-xl">
        <div className="flex gap-2 items-center border-2 border-grey border-opacity-50 rounded-xl bg-white w-1/2">
          <LuSearch className="text-2xl ml-5 text-primary" />
          <input
            type="text"
            name="searchValue"
            id=""
            placeholder="Search"
            className="p-4 border-none outline-none min-w-[400px] w-full rounded-2xl"
            onChange={handleChange}
          />
        </div>
        <input
          type="text"
          placeholder="From date"
          className="rounded-xl px-2 border-2 border-grey border-opacity-50 outline-none w-[100px]"
        />
        <input
          type="text"
          placeholder="To date"
          className="rounded-xl px-2 border-2 border-grey border-opacity-50 outline-none w-[100px]"
        />
        <button className="flex items-center gap-2 p-4 rounded-xl text-primary bg-white shadow-lg flex-1 justify-center">
          <IoFilter />
          <span>Apply</span>
        </button>
        <button className="flex items-center gap-2 p-4 rounded-xl text-primary bg-white shadow-lg flex-1 justify-center">
          <FiPrinter />
          <span>Print</span>
        </button>
      </div>
      <div className="flex-1">{children}</div>
      <div className="flex justify-between items-center mt-5 bg-link-hover p-5 rounded-xl">
        <div className="flex gap-1">
          <span>{page}</span>
          of
          <span>{pageCount}</span>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-grey">The page you’re on</p>
          <select
            name=""
            id=""
            className="outline-none shadow-lg rounded-md px-3 py-2 text-primary"
            onChange={handleSelectPage}
            value={page}
          >
            {pageList.map((p) => (
              <option defaultValue={p} key={p}>
                {p}
              </option>
            ))}
          </select>
          <div className="flex gap-2 pl-4 border-l-2 border-grey border-opacity-50">
            <button
              className={`w-[40px] h-[40px] rounded-md grid place-items-center bg-white shadow-lg text-primary ${
                page === 1 ? "opacity-50" : ""
              }`}
              disabled={page === 1 ? true : false}
              onClick={handlePrevPage}
            >
              <FaArrowLeft />
            </button>
            <button
              className={`w-[40px] h-[40px] rounded-md grid place-items-center bg-white shadow-lg text-primary ${
                page === pageCount ? "opacity-50" : ""
              }`}
              disabled={page === pageCount ? true : false}
              onClick={handleNextPage}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
