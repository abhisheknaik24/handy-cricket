import { axiosInstance } from '@/lib/axiosInstance';

export const getTeams = async () => {
  try {
    const res = await axiosInstance.get('/api/team');

    if (!res.status) {
      throw new Error('Something went wrong!');
    }

    return res.data;
  } catch (error: any) {
    throw new Error('Something went wrong!');
  }
};
