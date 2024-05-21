import { Loader } from '@/components/loader/loader';
import { useGetQualifier } from '@/hooks/useGetPointsTable copy';
import { QualifierTeamsCard } from './qualifier-teams-card';

export const Qualifier = () => {
  const { data: res, isLoading } = useGetQualifier();

  if (isLoading) {
    return <Loader />;
  }

  if (!res?.data?.matches?.length) {
    return null;
  }

  return (
    <div className='my-4'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div className='flex flex-col items-center justify-around gap-4 md:gap-20'>
          <QualifierTeamsCard
            id={res?.data?.matches?.[0]?.id}
            tournamentId={res?.data?.matches?.[0]?.tournamentId}
            title='Semi Final One'
            teamOneId={res?.data?.matches?.[0]?.teamOneId}
            teamOneLogo={res?.data?.matches?.[0]?.teamOne?.team?.logo}
            teamOneName={res?.data?.matches?.[0]?.teamOne?.team?.name}
            teamTwoId={res?.data?.matches?.[0]?.teamTwoId}
            teamTwoLogo={res?.data?.matches?.[0]?.teamTwo?.team?.logo}
            teamTwoName={res?.data?.matches?.[0]?.teamTwo?.team?.name}
            winnerTeamId={res?.data?.matches?.[0]?.winnerTeamId}
          />

          <QualifierTeamsCard
            id={res?.data?.matches?.[1]?.id}
            tournamentId={res?.data?.matches?.[1]?.tournamentId}
            title='Semi Final Two'
            teamOneId={res?.data?.matches?.[1]?.teamOneId}
            teamOneLogo={res?.data?.matches?.[1]?.teamOne?.team?.logo}
            teamOneName={res?.data?.matches?.[1]?.teamOne?.team?.name}
            teamTwoId={res?.data?.matches?.[1]?.teamTwoId}
            teamTwoLogo={res?.data?.matches?.[1]?.teamTwo?.team?.logo}
            teamTwoName={res?.data?.matches?.[1]?.teamTwo?.team?.name}
            winnerTeamId={res?.data?.matches?.[1]?.winnerTeamId}
          />
        </div>
        {res?.data?.matches?.length > 2 && (
          <div className='flex items-center justify-center'>
            <QualifierTeamsCard
              id={res?.data?.matches?.[2]?.id}
              tournamentId={res?.data?.matches?.[2]?.tournamentId}
              title='Final'
              teamOneId={res?.data?.matches?.[2]?.teamOneId}
              teamOneLogo={res?.data?.matches?.[2]?.teamOne?.team?.logo}
              teamOneName={res?.data?.matches?.[2]?.teamOne?.team?.name}
              teamTwoId={res?.data?.matches?.[2]?.teamTwoId}
              teamTwoLogo={res?.data?.matches?.[2]?.teamTwo?.team?.logo}
              teamTwoName={res?.data?.matches?.[2]?.teamTwo?.team?.name}
              winnerTeamId={res?.data?.matches?.[2]?.winnerTeamId}
            />
          </div>
        )}
      </div>
    </div>
  );
};
