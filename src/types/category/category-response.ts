import { ResponseType } from "../response.type";
import { CategoryType } from "./category.type";

export type CategoryResponse = ResponseType & {
  categories: CategoryType[];
};
