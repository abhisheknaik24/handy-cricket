import { getTournaments } from '@/actions/getTournaments';
import { useQuery } from '@tanstack/react-query';

export const useGetTournaments = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['tournaments'],
    queryFn: getTournaments,
  });

  return { data, isLoading };
};
