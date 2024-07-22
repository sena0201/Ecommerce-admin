import { ResponseType } from "../response.type";
import { OrderType } from "./order.type";

export type OrderResponse = ResponseType & {
  orders: OrderType[];
};
