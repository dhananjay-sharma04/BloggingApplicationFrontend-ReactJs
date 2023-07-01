import { BASE_URL, REGISTER_USER } from "../constant/ApiConstant";
import {toast} from 'react-toastify'

async function registerUser(event, data) {
    event.preventDefault()
  try {
    const response = await fetch(BASE_URL + REGISTER_USER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json()
    if (responseData.status === "OK") {
        toast.success(responseData.message)
      } else {
        toast.error(responseData.message)
      }
    
  } catch (error) {
    toast.error(error)
  }
}

export default registerUser