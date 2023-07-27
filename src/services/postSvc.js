import { CREATE_POST, PAGEABLE_POST_LIST } from "../constant/ApiUrlConstant";
import { getCurrentUserDetail } from "./AuthenticationSvc";
import { myAxios, privateAxios } from "./helper";

export const savePost = async (postData, image) => {
  let formData = new FormData();
  formData.append("postDto", JSON.stringify(postData));
  if (image != null) {
    formData.append("image", image)
  }
  const response = await privateAxios.post(
    CREATE_POST +
      "/" +
      `${getCurrentUserDetail().id}` +
      "/" +
      `${postData.catTitle}`,
    formData
  );
  return response.data;
};

export const pageablePostList = async (pageNumber, pageSize) => {
  const response = await myAxios.get(
    `${PAGEABLE_POST_LIST}?page=${pageNumber}&pageSize=${pageSize}`
  );
  return response.data;
};
