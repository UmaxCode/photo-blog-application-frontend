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

export const fetchOthersPost = async () => {
  try {
    const response = await api.get(`${Endpoints.PHOTOS}/others-photo`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const movePostToRecyclingBin = async (id: string) => {
  try {
    const response = await api.patch(`${Endpoints.PHOTOS}/${id}/recycle-bin`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const sharePost = async (id: string) => {
  try {
    const response = await api.get(
      `${Endpoints.PHOTOS}/${id}/generate-pre-signed-url`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchUserRecycledPost = async () => {
  try {
    const response = await api.get(`${Endpoints.PHOTOS}/recycle-bin`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const restorePostFromRecyclingBin = async (id: string) => {
  try {
    const response = await api.patch(
      `${Endpoints.PHOTOS}/${id}/recycle-bin/restore`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const permanentlyDeletePost = async (id: string) => {
  try {
    const response = await api.delete(`${Endpoints.PHOTOS}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
