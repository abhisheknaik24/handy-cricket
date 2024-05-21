'use client';

import { updateRun } from '@/actions/updateRun';
import { MatchHeader } from '@/app/(main)/_components/match-header';
import { TeamDetails } from '@/app/(main)/_components/team-details';
import { Toss } from '@/app/(main)/_components/toss';
import { Loader } from '@/components/loader/loader';
import { queryClient } from '@/components/providers/query-provider';
import { Button } from '@/components/ui/button';
import { useGetMatchDetails } from '@/hooks/useGetMatchDetails';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

const MatchPage = () => {
  const params = useParams();

  const { data: res, isLoading } = useGetMatchDetails();

  const handleRunClick = async (run: number) => {
    try {
      if (run < 0 || run > 6) {
        return toast.error('Please select run!');
      }

      const res = await updateRun({
        tournamentId: params.tournamentId as string,
        matchId: params.matchId as string,
        run: run,
      });

      if (!res.status) {
        return toast.error(res.message);
      }

      queryClient.invalidateQueries({ queryKey: ['matchDetails'] });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!res?.data?.match?.id?.length) {
    return null;
  }

  return (
    <div className='w-full h-full p-4'>
      <MatchHeader
        tournamentId={res?.data?.match?.tournament?.id}
        matchNo={res?.data?.match?.matchNo}
        tournamentImage={res?.data?.match?.tournament?.image}
        tournamentName={res?.data?.match?.tournament?.name}
        winnerTeamId={res?.data?.match?.winnerTeamId}
      />
      <div className='flex flex-col items-center justify-start gap-10'>
        <div className='flex items-baseline justify-center gap-10 mt-10'>
          <TeamDetails
            teamId={res?.data?.match?.teamOneId}
            teamLogo={res?.data?.match?.teamOne?.team?.logo}
            teamName={res?.data?.match?.teamOne?.team?.name}
            playerTeamId={res?.data?.match?.playerTeamId}
            tossWinnerTeamId={res?.data?.match?.tossWinnerTeamId}
            teamStatus={res?.data?.match?.teamOneStatus}
            teamScore={res?.data?.match?.teamOneScore}
            teamWicket={res?.data?.match?.teamOneWicket}
            teamBalls={res?.data?.match?.teamOneBalls}
            inning={res?.data?.match?.inning}
            winnerTeamId={res?.data?.match?.winnerTeamId}
          />
          <h2 className='text-2xl font-bold md:text-4xl text-secondary-foreground/50'>
            VS
          </h2>
          <TeamDetails
            teamId={res?.data?.match?.teamTwoId}
            teamLogo={res?.data?.match?.teamTwo?.team?.logo}
            teamName={res?.data?.match?.teamTwo?.team?.name}
            playerTeamId={res?.data?.match?.playerTeamId}
            tossWinnerTeamId={res?.data?.match?.tossWinnerTeamId}
            teamStatus={res?.data?.match?.teamTwoStatus}
            teamScore={res?.data?.match?.teamTwoScore}
            teamWicket={res?.data?.match?.teamTwoWicket}
            teamBalls={res?.data?.match?.teamTwoBalls}
            inning={res?.data?.match?.inning}
            winnerTeamId={res?.data?.match?.winnerTeamId}
          />
        </div>
        {!!res?.data?.match?.playerTeamId?.length &&
          !res?.data?.match?.winnerTeamId?.length && (
            <>
              <Toss
                playerTeamId={res?.data?.match?.playerTeamId}
                tossWinnerTeamId={res?.data?.match?.tossWinnerTeamId}
                teamChooseFirst={res?.data?.match?.teamChooseFirst}
              />

              {!!res?.data?.match?.tossWinnerTeamId?.length &&
                !!res?.data?.match?.teamChooseFirst?.length && (
                  <div className='grid grid-cols-7 gap-2 mt-4'>
                    {Array.from({ length: 7 }, (_, index) => (
                      <Button
                        key={index}
                        variant='outline'
                        className='w-12 h-12 text-2xl md:text-4xl md:w-16 md:h-16'
                        onClick={() => handleRunClick(index)}
                      >
                        {index}
                      </Button>
                    ))}
                  </div>
                )}
            </>
          )}
      </div>
    </div>
  );
};

export default MatchPage;
