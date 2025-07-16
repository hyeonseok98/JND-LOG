import axios from "axios";

const isServer = typeof window === "undefined";

function getBaseURL() {
  if (isServer) {
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

    return "http://localhost:3000";
  }

  return "";
}

export const apiClient = axios.create({
  baseURL: getBaseURL(),
  headers: { "Content-Type": "application/json" },
  timeout: 15_000,
});

export default apiClient;
