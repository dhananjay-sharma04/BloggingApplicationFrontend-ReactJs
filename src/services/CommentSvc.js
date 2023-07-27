import { COMMENT_LIST, CREATE_COMMENT } from "../constant/ApiUrlConstant";
import { getCurrentUserDetail } from "./AuthenticationSvc";
import { myAxios, privateAxios } from "./helper";

export const commentList = async (postId) => {
  const response = await myAxios.get(COMMENT_LIST+postId);
  return response.data;
};

export const saveComment = async (comment, postId) => {
    const response = await privateAxios.post(`${CREATE_COMMENT}?userId=${getCurrentUserDetail()?.id}&postId=${postId}`, comment);
    return response.data;
}