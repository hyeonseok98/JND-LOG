import axios from "axios";

const isServer = typeof window === "undefined";

function getBaseURL() {
  // production
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  // dev
  if (process.env.NEXT_PUBLIC_LOCAL_URL) return process.env.NEXT_PUBLIC_LOCAL_URL;

  // fallback
  return isServer ? "http://localhost:3000" : "";
}

export const apiClient = axios.create({
  baseURL: getBaseURL(),
  headers: { "Content-Type": "application/json" },
  timeout: 15_000,
});

export default apiClient;
