import { ResponseType } from "../response.type";
import { SupplierType } from "./supplier.type";
export type SupplierResponse = ResponseType & {
  suppliers: SupplierType[];
};
