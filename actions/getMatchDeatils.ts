import { axiosInstance } from '@/lib/axiosInstance';

export const getMatchDeatils = async ({
  tournamentId,
  matchId,
}: {
  tournamentId: string;
  matchId: string;
}) => {
  try {
    const res = await axiosInstance.get(
      `/api/tournament/${tournamentId}/match/${matchId}`
    );

    if (!res.status) {
      throw new Error('Something went wrong!');
    }

    return res.data;
  } catch (error: any) {
    throw new Error('Something went wrong!');
  }
};
