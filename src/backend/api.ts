import axios from "axios";

const APP_BASE_URL = import.meta.env.VITE_api_gateway_endpoint;

export const api = axios.create({
  baseURL: APP_BASE_URL,
  timeout: 30000, // Timeout in ms
});

api.interceptors.request.use(
  (config) => {
    // Add headers or authentication tokens if needed
    config.headers["Authorization"] = `Bearer ${sessionStorage.getItem(
      "id_token"
    )}`;

    // Set default Content-Type based on request type
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json"; // Default to JSON
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
