import axios from "axios";

const APP_BASE_URL = import.meta.env.VITE_api_gateway_endpoint;

export const api = axios.create({
  baseURL: APP_BASE_URL,
  timeout: 10000, // Timeout in ms
});

api.interceptors.request.use(
  (config) => {
    // Add headers or authentication tokens if needed
    config.headers["Authorization"] = `Bearer ${sessionStorage.getItem(
      "id_token"
    )}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
