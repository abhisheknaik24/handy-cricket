import { axiosInstance } from '@/lib/axiosInstance';

export const updateTeamChooseFirst = async ({
  tournamentId,
  matchId,
  teamChooseFirst,
}: {
  tournamentId: string;
  matchId: string;
  teamChooseFirst: string;
}) => {
  try {
    const res = await axiosInstance.patch(
      `/api/tournament/${tournamentId}/match/${matchId}/toss/teamChooseFirst`,
      {
        teamChooseFirst,
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
