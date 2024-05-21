import { axiosInstance } from '@/lib/axiosInstance';

export const deleteTournament = async ({
  tournamentId,
}: {
  tournamentId: string;
}) => {
  try {
    const res = await axiosInstance.delete(`/api/tournament/${tournamentId}`);

    if (!res.status) {
      throw new Error('Something went wrong!');
    }

    return res.data;
  } catch (error: any) {
    throw new Error('Something went wrong!');
  }
};
