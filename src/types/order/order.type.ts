import { OrderDetailtype } from "../OrderDetails/OrderDetail.type";
import { StatusType } from "../status/status.type";

export type OrderType = {
  orderId: number;
  userId: number;
  orderTime: string;
  statusId: number;
  orderDetails?: OrderDetailtype[];
};
