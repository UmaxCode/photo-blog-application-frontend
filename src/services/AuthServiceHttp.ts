import axios from "axios";
import { useEndpoints } from "../hooks/use-endpoints";
import { useConfig } from "../contexts/ConfigContext";

export const fetchToken = async (code: string) => {
  const { AUTH } = useEndpoints();
  const { clientId, clientSecret } = useConfig();
  try {
    const encodedCredentials = btoa(`${clientId}:${clientSecret}`);

    const response = await axios.post(
      AUTH.TOKEN,
      {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: AUTH.CALLBACK,
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
