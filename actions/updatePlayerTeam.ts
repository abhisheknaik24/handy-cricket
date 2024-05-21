import { axiosInstance } from '@/lib/axiosInstance';

export const updatePlayerTeam = async ({
  tournamentId,
  matchId,
  playerTeamId,
}: {
  tournamentId: string;
  matchId: string;
  playerTeamId: string;
}) => {
  try {
    const res = await axiosInstance.patch(
      `/api/tournament/${tournamentId}/match/${matchId}/player`,
      {
        playerTeamId,
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
