import { getMatches } from '@/actions/getMatches';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useGetMatches = () => {
  const params = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['matches', params.tournamentId, params.teamId],
    queryFn: () =>
      getMatches({
        tournamentId: params.tournamentId as string,
        teamId: params.teamId as string,
      }),
    enabled: !!params.tournamentId?.length && !!params.teamId?.length,
  });

  return { data, isLoading };
};
