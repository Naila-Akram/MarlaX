import {getToken} from "@utils/helper";
import axios from "axios";
import {BASE_URL} from "./endpoints";

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
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
  error => Promise.reject(error),
);

http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return error?.response ?? error;
  },
);

export default http;
