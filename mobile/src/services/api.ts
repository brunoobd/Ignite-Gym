import { AppError } from "@utils/AppError";
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.15.6:3333",
  timeout: 500,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorResponseData = error.response?.data;

    if (errorResponseData) {
      return Promise.reject(new AppError(errorResponseData.message));
    } else {
      return Promise.reject(error);
    }
  }
);

export { api };
