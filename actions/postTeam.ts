import { axiosInstance } from '@/lib/axiosInstance';

export const postTeam = async ({
  tournamentId,
  logo,
  name,
}: {
  tournamentId: string;
  logo: string;
  name: string;
}) => {
  try {
    const res = await axiosInstance.post(
      `/api/tournament/${tournamentId}/team`,
      {
        logo,
        name,
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
