import { axiosInstance } from '@/lib/axiosInstance';

export const getAPI = async (url: string) => {
  try {
    const res = await axiosInstance.get(url);

    if (!res.status) {
      throw new Error('Something went wrong!');
    }

    return res.data;
  } catch (error: any) {
    throw new Error('Something went wrong!');
  }
};

export const postAPI = async (url: string, data: any) => {
  try {
    const res = await axiosInstance.post(url, data);

    if (!res.status) {
      throw new Error('Something went wrong!');
    }

    return res.data;
  } catch (error: any) {
    throw new Error('Something went wrong!');
  }
};

export const patchAPI = async (url: string, data: any) => {
  try {
    const res = await axiosInstance.patch(url, data);

    if (!res.status) {
      throw new Error('Something went wrong!');
    }

    return res.data;
  } catch (error: any) {
    throw new Error('Something went wrong!');
  }
};

export const deleteAPI = async (url: string) => {
  try {
    const res = await axiosInstance.delete(url);

    if (!res.status) {
      throw new Error('Something went wrong!');
    }

    return res.data;
  } catch (error: any) {
    throw new Error('Something went wrong!');
  }
};
