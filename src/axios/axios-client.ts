import axios from "axios";
import Cookies from "js-cookie";

const AxiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

AxiosClient.interceptors.request.use((config) => {
  const token = Cookies.get("access_tknx");
  config.headers.set("Authorization", `Bearer ${token}`);

  return config;
});

export default AxiosClient;
