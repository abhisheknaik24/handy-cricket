import { getTeams } from '@/actions/getTeams';
import { useQuery } from '@tanstack/react-query';

export const useGetTeams = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['teams'],
    queryFn: () => getTeams(),
  });

  return { data, isLoading };
};
