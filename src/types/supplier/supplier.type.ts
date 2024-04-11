import { CategoryType } from "./../category/category.type";
export type SupplierType = {
  supplierId: number;
  supplierName: string;
  address: string;
  email: string;
  hotline: string;
  categories: CategoryType[];
};
