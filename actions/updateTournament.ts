import { axiosInstance } from '@/lib/axiosInstance';

export const updateTournament = async ({
  tournamentId,
  image,
  name,
}: {
  tournamentId: string;
  image: string;
  name: string;
}) => {
  try {
    const res = await axiosInstance.patch(`/api/tournament/${tournamentId}`, {
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
