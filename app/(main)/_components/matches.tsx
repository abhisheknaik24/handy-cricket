import { Loader } from '@/components/loader/loader';
import { useGetMatches } from '@/hooks/useGetMatches';
import { MatchCard } from './match-card';

export const Matches = () => {
  const { data: res, isLoading } = useGetMatches();

  if (isLoading) {
    return <Loader />;
  }

  if (!res?.data?.matches?.length) {
    return null;
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mt-4'>
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
