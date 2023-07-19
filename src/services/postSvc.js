import { CREATE_POST, PAGEABLE_POST_LIST } from "../constant/ApiUrlConstant";
import { getCurrentUserDetail } from "./AuthenticationSvc";
import { privateAxios } from "./helper";

export const savePost = async (postData) => {
  const response = await privateAxios.post(
    `${CREATE_POST}?userId=${getCurrentUserDetail().id}&catTitle=${postData.catTitle}`,
    postData
  );
  return response.data;
};

export const pageablePostList = async (pageNumber, pageSize) => {
  const response = await privateAxios.get(`${PAGEABLE_POST_LIST}?page=${pageNumber}&pageSize=${pageSize}`);
  return response.data;
};