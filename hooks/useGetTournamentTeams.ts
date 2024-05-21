import { getTournamentTeams } from '@/actions/getTournamentTeams';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useGetTournamentTeams = () => {
  const params = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['tournamentTeams', params.tournamentId],
    queryFn: () =>
      getTournamentTeams({ tournamentId: params.tournamentId as string }),
    enabled: !!params.tournamentId?.length,
  });

  return { data, isLoading };
};
