import { updateTeamChooseFirst } from '@/actions/updateTeamChooseFirst';
import { updateToss } from '@/actions/updateToss';
import { queryClient } from '@/components/providers/query-provider';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

type Props = {
  playerTeamId: string;
  tossWinnerTeamId: string;
  teamChooseFirst: string;
};

export const Toss = ({
  playerTeamId,
  tossWinnerTeamId,
  teamChooseFirst,
}: Props) => {
  const params = useParams();

  const handleTossClick = async () => {
    try {
      const res = await updateToss({
        tournamentId: params.tournamentId as string,
        matchId: params.matchId as string,
      });

      if (!res.status) {
        return toast.error(res.message);
      }

      toast.success(res.message);

      queryClient.invalidateQueries({ queryKey: ['matchDetails'] });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSelectTeamChooseFirstClick = async (teamChooseFirst: string) => {
    try {
      if (!teamChooseFirst?.length) {
        return toast.error('Please select what you do first!');
      }

      const res = await updateTeamChooseFirst({
        tournamentId: params.tournamentId as string,
        matchId: params.matchId as string,
        teamChooseFirst: teamChooseFirst,
      });

      if (!res.status) {
        return toast.error(res.message);
      }

      toast.success(res.message);

      queryClient.invalidateQueries({ queryKey: ['matchDetails'] });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {!tossWinnerTeamId?.length && (
        <Button
          size='lg'
          className='text-2xl bg-yellow-500 text-foreground hover:bg-yellow-500/50'
          onClick={handleTossClick}
        >
          Toss
        </Button>
      )}
      {!teamChooseFirst?.length &&
        !!tossWinnerTeamId?.length &&
        playerTeamId === tossWinnerTeamId && (
          <div className='flex flex-col items-center justify-center'>
            <p className='text-muted-foreground'>
              Choose the what you do first
            </p>
            <div className='flex items-center gap-2 mt-2'>
              <Button
                size='lg'
                variant='secondary'
                onClick={() => handleSelectTeamChooseFirstClick('bat')}
              >
                Bat
              </Button>
              <Button
                size='lg'
                variant='secondary'
                onClick={() => handleSelectTeamChooseFirstClick('bowl')}
              >
                Bowl
              </Button>
            </div>
          </div>
        )}
    </>
  );
};
