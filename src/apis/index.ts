import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_URL ?? "",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

export default apiClient;
