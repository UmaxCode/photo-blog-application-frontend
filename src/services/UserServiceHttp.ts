import { api } from "../backend/api";

const APP_BASE_URL = import.meta.env.VITE_api_gateway_endpoint;
const PHOTOS = `${APP_BASE_URL}/photos`;

export const fetchUsersPost = async () => {
  try {
    const response = await api.get(`${PHOTOS}/own-photo`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchOthersPost = async () => {
  try {
    const response = await api.get(`${PHOTOS}/others-photo`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const movePostToRecyclingBin = async (id: string) => {
  try {
    const response = await api.patch(`${PHOTOS}/${id}/recycle-bin`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const sharePost = async (id: string) => {
  try {
    const response = await api.get(`${PHOTOS}/${id}/generate-pre-signed-url`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchUserRecycledPost = async () => {
  try {
    const response = await api.get(`${PHOTOS}/recycle-bin`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const restorePostFromRecyclingBin = async (id: string) => {
  try {
    const response = await api.patch(`${PHOTOS}/${id}/recycle-bin/restore`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const permanentlyDeletePost = async (id: string) => {
  try {
    const response = await api.delete(`${PHOTOS}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
