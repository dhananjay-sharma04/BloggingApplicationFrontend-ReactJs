import { CATEGORY_LIST } from "../constant/ApiUrlConstant";
import { privateAxios } from "./helper";

export const categoryList = async () => {
  const response = await privateAxios.get(CATEGORY_LIST);
  return response.data;
};