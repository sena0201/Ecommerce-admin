"use client";
import { updateOrder } from "@/api/order-api";
import { useGetOrder } from "@/hooks/use-orders";
import { useStatus } from "@/hooks/use-status";
import { useUser } from "@/hooks/use-user";
import { OrderDetailtype } from "@/types/OrderDetails/OrderDetail.type";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

function OrderDetails({
  params,
}: {
  params: { orderId: string };
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [orderId, setOrderId] = useState<number>(
    parseInt(params.orderId)
  );
  function calculateTotalPrice(
    orderDetails?: OrderDetailtype[]
  ) {
    let totalPrice = 0;

    orderDetails?.forEach((orderDetail) => {
      const quantity = orderDetail.quantity;
      const price = orderDetail.product.price;
      totalPrice += quantity * price;
    });

    return totalPrice;
  }
  const { data: order } = useGetOrder(orderId);
  const { data: statuses } = useStatus();
  const { data: user } = useUser(order?.userId);
  const [statusId, setStatusId] = useState<number>(0);
  const handleChangeStatus = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    setStatusId(parseInt(e.target.value));
  };
  const UpdateOrderMutation = useMutation({
    mutationFn: (data: {
      orderId: number;
      statusId: number;
    }) => updateOrder(data.orderId, data.statusId),
    onSuccess: () => {
      toast.success("Update Order Success");
      router.push("/Order");
    },
    onError: () => {
      toast.error("Error");
    },
  });
  const handleUpdateOrder = () => {
    let data: { orderId: number; statusId: number } = {
      orderId: order?.orderId as number,
      statusId: statusId,
    };
    UpdateOrderMutation.mutate(data);
  };
  useEffect(() => {
    if (order) {
      setStatusId(order.statusId);
    }
  }, [order]);

  return (
    <div className="bg-white rounded-3xl p-8">
      <h1 className="text-4xl mb-8">Order Details</h1>
      <div className="flex justify-end gap-2">
        <select
          name=""
          id=""
          value={statusId}
          className="border-2 rounded-md w-[100px]"
          onChange={handleChangeStatus}
        >
          {statuses?.map((status) => (
            <option
              key={status.statusId}
              value={status.statusId}
            >
              {status.description}
            </option>
          ))}
        </select>
        <button
          className="border-2 border-green-500 px-4 py-2 rounded-md bg-green-500 text-white"
          onClick={handleUpdateOrder}
        >
          Save
        </button>
      </div>
      <div className="flex gap-2 text-xl">
        <p>Order Id:</p>
        <span>{params.orderId}</span>
      </div>
      <div className="flex gap-2 text-xl">
        <p>User name:</p>
        <span>
          {user ? user.firstName + " " + user.lastName : ""}
        </span>
      </div>
      <div className="flex gap-2 text-xl">
        <p>Order time:</p>
        <span>{order?.orderTime}</span>
      </div>
      <div className="flex gap-2 text-xl">
        <p>Total:</p>
        <span>
          {order
            ? calculateTotalPrice(order.orderDetails)
            : 0}
        </span>
      </div>
      <table className="w-full my-8 text-[18px]">
        <thead>
          <tr>
            <th>#</th>
            <th className="text-start">Product name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order?.orderDetails?.map((item, index) => (
            <tr key={item.orderDetailId}>
              <td className="text-center">{index + 1}</td>
              <td>{item.product.productName}</td>
              <td className="text-center">
                {item.product.price}
              </td>
              <td className="text-center">
                {item.quantity}
              </td>
              <td className="text-center">
                {item.product.price * item.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetails;
