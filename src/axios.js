// src/utils/axios.js or wherever you're storing this

import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_API_URL;

// ✅ Authenticated request instance
export const makeRequest = axios.create({
  baseURL: apiUrl,
});

// ✅ Unauthenticated/public request instance
export const publicRequest = axios.create({
  baseURL: apiUrl,
});

// 🔐 Interceptor for authenticated requests
makeRequest.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    config.headers["Content-Type"] =
      config.data instanceof FormData
        ? "multipart/form-data"
        : "application/json";

    return config;
  },
  (error) => Promise.reject(error)
);

export default makeRequest;
