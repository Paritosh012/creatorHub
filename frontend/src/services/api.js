import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE;

if (!BASE_URL) {
  console.error("❌ VITE_API_BASE is not defined");
}

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 8000, 
});

export default api;
