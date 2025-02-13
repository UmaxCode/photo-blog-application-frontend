import axios from "axios";
import { Endpoints } from "../backend/endpoints";

export const fetchToken = async (code: string) => {
  try {
    const clientId = import.meta.env.VITE_client_id;
    const clientSecret = import.meta.env.VITE_client_secret;
    const encodedCredentials = btoa(`${clientId}:${clientSecret}`);

    const response = await axios.post(
      Endpoints.AUTH.TOKEN,
      {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: Endpoints.AUTH.CALLBACK,
        client_id: clientId,
        client_secret: clientSecret,
      },
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
