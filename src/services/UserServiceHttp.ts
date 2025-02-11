import { api } from "../backend/api";
import { Endpoints } from "../backend/endpoints";

export const fetchUsersPost = async () => {
  try {
    const response = await api.get(`${Endpoints.PHOTOS}/own-photo`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
