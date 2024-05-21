import { axiosInstance } from '@/lib/axiosInstance';

export const postMatches = async ({
  tournamentId,
}: {
  tournamentId: string;
}) => {
  try {
    const res = await axiosInstance.post(
      `/api/tournament/${tournamentId}/match`
    );

    if (!res.status) {
      throw new Error('Something went wrong!');
    }

    return res.data;
  } catch (error: any) {
    throw new Error('Something went wrong!');
  }
};
