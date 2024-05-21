import { axiosInstance } from '@/lib/axiosInstance';

export const postTournamentTeam = async ({
  tournamentId,
  teamId,
}: {
  tournamentId: string;
  teamId: string;
}) => {
  try {
    const res = await axiosInstance.post(
      `/api/tournament/${tournamentId}/team`,
      {
        teamId,
      }
    );

    if (!res.status) {
      throw new Error('Something went wrong!');
    }

    return res.data;
  } catch (error: any) {
    throw new Error('Something went wrong!');
  }
};
