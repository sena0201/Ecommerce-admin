import { ResponseType } from "../response.type";
import { ProductType } from "./product.type";

export type ProductResponse = ResponseType & {
  products: ProductType[];
};
