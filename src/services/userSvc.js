import { LOGIN_USER, REGISTER_USER } from "../constant/ApiUrlConstant";
import { myAxios } from "./helper";

export const signUp = async (user, image) => {
  let formData = new FormData();
  formData.append("usrDto", JSON.stringify(user));
  if (image != null) {
    formData.append("image", image)
  }
  const response = await myAxios.post(REGISTER_USER, formData);
    return response.data;
};

export const login = async (emailAndPassword) => {
  const response = await myAxios.post(LOGIN_USER, emailAndPassword);
    return response.data;
}