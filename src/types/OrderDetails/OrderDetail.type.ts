import { ProductType } from "../product/product.type";

export type OrderDetailtype = {
  orderDetailId: number;
  orderId: number;
  productId: number;
  quantity: number;
  product: ProductType;
};
