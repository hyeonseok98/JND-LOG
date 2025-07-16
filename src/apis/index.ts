import axios from "axios";

const isBrowser = typeof window !== "undefined";

export const apiClient = axios.create({
  baseURL: isBrowser ? "" : process.env.INTERNAL_API_BASE,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});
