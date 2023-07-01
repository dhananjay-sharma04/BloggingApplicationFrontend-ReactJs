import axios from "axios";
import { BASE_URL } from "../constant/ApiUrlConstant";

export const myAxios = axios.create({
    baseURL: BASE_URL
})