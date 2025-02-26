import axios from "axios";
import { useConfig } from "../contexts/ConfigContext";

export const fetchToken = async (code: string) => {
  const { auth, callback, clientId, clientSecret } = useConfig();
  try {
    const encodedCredentials = btoa(`${clientId}:${clientSecret}`);

    const response = await axios.post(
      `${auth}/oauth2/token`,
      {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: callback,
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
