import { getMatchDeatils } from '@/actions/getMatchDeatils';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useGetMatchDetails = () => {
  const params = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['matchDetails', params.tournamentId, params.matchId],
    queryFn: () =>
      getMatchDeatils({
        tournamentId: params.tournamentId as string,
        matchId: params.matchId as string,
      }),
    enabled: !!params.tournamentId?.length && !!params.matchId,
  });

  return { data, isLoading };
};
