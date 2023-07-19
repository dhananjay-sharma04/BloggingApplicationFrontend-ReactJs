import { CREATE_POST } from "../constant/ApiUrlConstant";
import { getCurrentUserDetail } from "./AuthenticationSvc";
import { privateAxios } from "./helper";

export const savePost = async (postData) => {
  const response = await privateAxios.post(
    `${CREATE_POST}?userId=${getCurrentUserDetail().id}&catTitle=${postData.catTitle}`,
    postData
  );
  return response.data;
};
