import { patchAPI } from '@/actions/actions';
import { Loader } from '@/components/loader/loader';
import { queryClient } from '@/components/providers/query-provider';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
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

  const tossMutation = useMutation({
    mutationFn: (data: any) =>
      patchAPI(
        `/api/matches/patchToss/${params.tournamentId}/${params.matchId}`,
        data
      ),
    onSuccess: (res) => {
      if (!res.success) {
        return toast.error(res.message);
      }

      toast.success(res.message);

      queryClient.invalidateQueries({ queryKey: ['matchDetails'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const tossChooseMutation = useMutation({
    mutationFn: (data: any) =>
      patchAPI(
        `/api/matches/patchTossChoose/${params.tournamentId}/${params.matchId}`,
        data
      ),
    onSuccess: (res) => {
      if (!res.success) {
        return toast.error(res.message);
      }

      toast.success(res.message);

      queryClient.invalidateQueries({ queryKey: ['matchDetails'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleTossClick = async () => {
    tossMutation.mutate({});
  };

  const handleTossChooseClick = async (tossChoose: string) => {
    if (!tossChoose?.length) {
      return toast.error('Please select what you do first!');
    }

    tossMutation.mutate({ tossChoose });
  };

  if (tossMutation.isPending || tossChooseMutation.isPending) {
    return <Loader />;
  }

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
                onClick={() => handleTossChooseClick('bat')}
              >
                Bat
              </Button>
              <Button
                size='lg'
                variant='secondary'
                onClick={() => handleTossChooseClick('bowl')}
              >
                Bowl
              </Button>
            </div>
          </div>
        )}
    </>
  );
};
