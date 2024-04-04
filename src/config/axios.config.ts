import { getSession } from "@/lib/auth";
import axios from "axios";

const API_VERSION = "/api/v1";

const axiosConfig = axios.create({
  baseURL: "https://test.saranatechnology.com" + API_VERSION,
});

axiosConfig.interceptors.request.use(
  async function (config) {
    const session = await getSession();
    if (session?.data?.token) {
      config.headers.Authorization = "Bearer " + session?.data?.token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosConfig;
