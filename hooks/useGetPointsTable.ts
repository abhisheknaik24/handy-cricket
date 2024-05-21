import { getPointsTable } from '@/actions/getPointsTable';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useGetPointsTable = () => {
  const params = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['pointsTable', params.tournamentId],
    queryFn: () =>
      getPointsTable({ tournamentId: params.tournamentId as string }),
    enabled: !!params.tournamentId?.length,
  });

  return { data, isLoading };
};
