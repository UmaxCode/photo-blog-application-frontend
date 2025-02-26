import axios from "axios";
type fetchTokenType = {
  code: string;
  clientId: string;
  clientSecret: string;
  callback: string;
  auth: string;
};
export const fetchToken = async (fetchData: fetchTokenType) => {
  try {
    const encodedCredentials = btoa(
      `${fetchData.clientId}:${fetchData.clientSecret}`
    );

    const response = await axios.post(
      `${fetchData.auth}/oauth2/token`,
      {
        grant_type: "authorization_code",
        code: fetchData.code,
        redirect_uri: fetchData.callback,
        client_id: fetchData.clientId,
        client_secret: fetchData.clientSecret,
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
