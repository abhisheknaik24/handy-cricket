import { axiosInstance } from '@/lib/axiosInstance';

export const getQualifier = async ({
  tournamentId,
}: {
  tournamentId: string;
}) => {
  try {
    const res = await axiosInstance.get(
      `/api/tournament/${tournamentId}/qualifier`
    );

    if (!res.status) {
      throw new Error('Something went wrong!');
    }

    return res.data;
  } catch (error: any) {
    throw new Error('Something went wrong!');
  }
};
