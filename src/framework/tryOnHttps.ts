import {getToken} from "@utils/helper";
import axios from "axios";
import {TRY_ON_BASE_URL} from "./endpoints";

const tryOnHttp = axios.create({
  baseURL: TRY_ON_BASE_URL,
  timeout: 300000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

tryOnHttp.interceptors.request.use(
  async config => {
    const token = getToken();
    config.headers = {
      ...config.headers,
      "Content-Type":
        config.data instanceof FormData
          ? "multipart/form-data"
          : "application/json",
      Authorization: `Bearer ${token ?? ""}`,
      "X-CSRF-TOKEN": "",
    };

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

tryOnHttp.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return error?.response;
  },
);

export default tryOnHttp;
