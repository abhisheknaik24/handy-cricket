import { axiosInstance } from '@/lib/axiosInstance';

export const getTournamentTeams = async ({
  tournamentId,
}: {
  tournamentId: string;
}) => {
  try {
    const res = await axiosInstance.get(`/api/tournament/${tournamentId}/team`);

    if (!res.status) {
      throw new Error('Something went wrong!');
    }

    return res.data;
  } catch (error: any) {
    throw new Error('Something went wrong!');
  }
};
