import axios from "axios";

export const API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_URL || process.env.NEXT_PUBLIC_VERCEL_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
