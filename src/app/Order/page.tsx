"use client";
import List from "@/components/List";
import { useOrders } from "@/hooks/use-orders";
import { OrderType } from "@/types/order/order.type";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MoonLoader } from "react-spinners";

function OrderPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] =
    useState<string>("");
  const { data, error, isLoading } = useOrders(page);

  const [pageSize, setPageSize] = useState<number>(5);
  const [pageCount, setPageCount] = useState<number>(0);
  const [pageList, setPageList] = useState<number[]>([]);
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
      <h1 className="text-4xl font-semibold text-primary">
        Order
      </h1>
      <p className="text-grey font-semibold mt-2">
        View all orders
      </p>
      <List
        page={page}
        pageSize={pageSize}
        pageCount={pageCount}
        pageList={pageList}
        title="Order"
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
                <th className="pb-2 w-[100px]">ID</th>
                <th className="text-start pb-2">
                  Order time
                </th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Action</th>

                {/* <th className="pb-2">Option</th> */}
              </tr>
            </thead>
            <tbody>
              {data?.orders.map((order: OrderType) => (
                <tr className="" key={order.orderId}>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px] m-2"
                    />
                  </td>
                  <td className="text-center w-[100px]">
                    {order.orderId}
                  </td>
                  <td className="truncate">
                    {order.orderTime}
                  </td>
                  <td className="mt-1 w-[100px]">
                    {order.statusId === 1 && (
                      <span className="text-center block w-full border-2 border-yellow-300 text-yellow-300 px-6 py-1 rounded-2xl">
                        Pending
                      </span>
                    )}
                    {order.statusId === 2 && (
                      <span className="text-center block w-full border-2 border-green-400 text-green-400 px-6 py-1 rounded-2xl">
                        Success
                      </span>
                    )}
                    {order.statusId === 0 && (
                      <span className="text-center block w-full border-2 border-red text-red px-6 py-1 rounded-2xl">
                        Reject
                      </span>
                    )}
                    {order.statusId === -1 && (
                      <span className="text-center block w-full border-2 border-gray-400 text-gray-400 px-6 py-1 rounded-2xl">
                        Cancel
                      </span>
                    )}
                  </td>
                  <td className="flex justify-center">
                    <Link
                      className="border-2 border-primary rounded-3xl px-2 py-1 text-primary hover:bg-primary hover:text-white"
                      href={`/Order/OrderDetails/${order.orderId}`}
                    >
                      View
                    </Link>
                  </td>
                  {/* <td className="text-center">
                    <div className="flex justify-center relative group">
                      <BsThreeDotsVertical />
                      <div className="absolute top-4 right-1/2 hidden group-hover:block bg-white shadow-xl z-40">
                        <button
                          className="px-4 py-2 w-full text-white bg-yellow-300"
                          // onClick={() =>
                          //   handleUpdate(product.productId)
                          // }
                        >
                          Update
                        </button>
                        <button
                          className="px-4 py-2 w-full text-white bg-red"
                          // onClick={() =>
                          //   deleteProductMutation.mutate(
                          //     product.productId
                          //   )
                          // }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </List>
    </div>
  );
}

export default OrderPage;
