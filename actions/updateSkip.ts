import { axiosInstance } from '@/lib/axiosInstance';

export const updateSkip = async ({
  tournamentId,
  matchId,
}: {
  tournamentId: string;
  matchId: string;
}) => {
  try {
    const res = await axiosInstance.patch(
      `/api/tournament/${tournamentId}/match/${matchId}/skip`
    );

    if (!res.status) {
      throw new Error('Something went wrong!');
    }

    return res.data;
  } catch (error: any) {
    throw new Error('Something went wrong!');
  }
};
