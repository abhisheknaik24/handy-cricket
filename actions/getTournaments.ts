import { axiosInstance } from '@/lib/axiosInstance';

export const getTournaments = async () => {
  try {
    const res = await axiosInstance.get('/api/tournament');

    if (!res.status) {
      throw new Error('Something went wrong!');
    }

    return res.data;
  } catch (error: any) {
    throw new Error('Something went wrong!');
  }
};
