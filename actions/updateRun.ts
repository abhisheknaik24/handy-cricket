import { axiosInstance } from '@/lib/axiosInstance';

export const updateRun = async ({
  tournamentId,
  matchId,
  run,
}: {
  tournamentId: string;
  matchId: string;
  run: number;
}) => {
  try {
    const res = await axiosInstance.patch(
      `/api/tournament/${tournamentId}/match/${matchId}/run`,
      {
        run,
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
