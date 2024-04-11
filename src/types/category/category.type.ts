import { ProductType } from "../product/product.type";
export type CategoryType = {
  categoryId: number;
  categoryName: string;
  description: string;
  supplierId: number;
  products: ProductType[];
};
