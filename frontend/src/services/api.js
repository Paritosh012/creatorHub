import axios from "axios";

/**
 * CHANGE:
 * - Added timeout to prevent infinite loading
 * - Centralized config (single source of truth)
 * - Defensive check for env variable
 */

const BASE_URL = import.meta.env.VITE_API_BASE;

if (!BASE_URL) {
  console.error("❌ VITE_API_BASE is not defined");
}

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 8000, // CHANGE: prevent hanging requests
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
