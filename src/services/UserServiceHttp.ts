import { api } from "../backend/api";
import { useEndpoints } from "../hooks/use-endpoints";

export const fetchUsersPost = async () => {
  const { PHOTOS } = useEndpoints();
  try {
    const response = await api.get(`${PHOTOS}/own-photo`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchOthersPost = async () => {
  const { PHOTOS } = useEndpoints();
  try {
    const response = await api.get(`${PHOTOS}/others-photo`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const movePostToRecyclingBin = async (id: string) => {
  const { PHOTOS } = useEndpoints();
  try {
    const response = await api.patch(`${PHOTOS}/${id}/recycle-bin`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const sharePost = async (id: string) => {
  const { PHOTOS } = useEndpoints();
  try {
    const response = await api.get(`${PHOTOS}/${id}/generate-pre-signed-url`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchUserRecycledPost = async () => {
  const { PHOTOS } = useEndpoints();
  try {
    const response = await api.get(`${PHOTOS}/recycle-bin`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const restorePostFromRecyclingBin = async (id: string) => {
  const { PHOTOS } = useEndpoints();
  try {
    const response = await api.patch(`${PHOTOS}/${id}/recycle-bin/restore`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const permanentlyDeletePost = async (id: string) => {
  const { PHOTOS } = useEndpoints();
  try {
    const response = await api.delete(`${PHOTOS}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
