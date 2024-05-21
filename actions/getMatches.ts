import { axiosInstance } from '@/lib/axiosInstance';

export const getMatches = async ({
  tournamentId,
  teamId,
}: {
  tournamentId: string;
  teamId: string;
}) => {
  try {
    const res = await axiosInstance.get(
      `/api/tournament/${tournamentId}/team/${teamId}/match`
    );

    if (!res.status) {
      throw new Error('Something went wrong!');
    }

    return res.data;
  } catch (error: any) {
    throw new Error('Something went wrong!');
  }
};
