import { axiosInstance } from '@/lib/axiosInstance';

export const postTournament = async ({
  image,
  name,
}: {
  image: string;
  name: string;
}) => {
  try {
    const res = await axiosInstance.post('/api/tournament', {
      image,
      name,
    });

    if (!res.status) {
      throw new Error('Something went wrong!');
    }

    return res.data;
  } catch (error: any) {
    throw new Error('Something went wrong!');
  }
};
