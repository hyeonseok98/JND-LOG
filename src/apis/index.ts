import axios from "axios";

export const CHZZK_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_URL || process.env.NEXT_PUBLIC_CHZZK_URL;

const apiClient = axios.create({
  baseURL: CHZZK_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export default apiClient;
