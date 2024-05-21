import { getQualifier } from '@/actions/getQualifier';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useGetQualifier = () => {
  const params = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['qualifier', params.tournamentId],
    queryFn: () =>
      getQualifier({ tournamentId: params.tournamentId as string }),
    enabled: !!params.tournamentId?.length,
  });

  return { data, isLoading };
};
