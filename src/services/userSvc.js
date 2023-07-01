import { LOGIN_USER, REGISTER_USER } from "../constant/ApiUrlConstant";
import { myAxios } from "./helper";

export const signUp = async (user) => {
  const response = await myAxios.post(REGISTER_USER, user);
    return response.data;
};

export const login = async (emailAndPassword) => {
  const response = await myAxios.post(LOGIN_USER, emailAndPassword);
    return response.data;
}