import { PhotoType } from "../photo/photo.type";

export type ProductType = {
  productId: number;
  productName: string;
  price: number;
  description: string;
  inventory: number;
  categoryId: number;
  photos: PhotoType[];
};
