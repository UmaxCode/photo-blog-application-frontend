import { useConfig } from "../contexts/ConfigContext";

export const useEndpoints = () => {
  const { auth, callback, websocket, clientId } = useConfig();
  const APP_BASE_URL = import.meta.env.VITE_api_gateway_endpoint;

  return {
    AUTH: {
      LOGIN: `${auth}/login?client_id=${clientId}&response_type=code&redirect_uri=${callback}`,
      TOKEN: `${auth}/oauth2/token`,
      CALLBACK: callback,
    },
    PHOTOS: `${APP_BASE_URL}/photos`,
    WSS: websocket,
  };
};
