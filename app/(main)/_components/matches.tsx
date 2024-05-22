import { getAPI } from '@/actions/actions';
import { Loader } from '@/components/loader/loader';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { MatchCard } from './match-card';

export const Matches = () => {
  const params = useParams();

  const {
    data: res,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['matches'],
    queryFn: () =>
      getAPI(`/api/matches/${params.tournamentId}/${params.teamId}`),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !res?.data?.matches?.length) {
    return null;
  }

  return (
    <div className='grid grid-cols-1 gap-2 mt-4 md:grid-cols-2'>
      {res?.data?.matches?.map((match: any) => (
        <MatchCard
          key={match?.id}
          id={match?.id}
          tournamentId={match?.tournamentId}
          teamOneId={match?.teamOneId}
          teamOneLogo={match?.teamOne?.team?.logo}
          teamOneName={match?.teamOne?.team?.name}
          teamTwoId={match?.teamTwoId}
          teamTwoLogo={match?.teamTwo?.team?.logo}
          teamTwoName={match?.teamTwo?.team?.name}
          winnerTeamId={match?.winnerTeamId}
        />
      ))}
    </div>
  );
};
