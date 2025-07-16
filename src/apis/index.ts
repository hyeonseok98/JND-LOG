import axios from "axios";

const isServer = typeof window === "undefined";

function getBaseURL() {
  if (isServer) {
    if (process.env.NODE_ENV === "development") return "http://localhost:3000";

    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  }

  return "";
}

export const apiClient = axios.create({
  baseURL: getBaseURL(),
  timeout: 15_000,
  headers: { "Content-Type": "application/json" },
});
