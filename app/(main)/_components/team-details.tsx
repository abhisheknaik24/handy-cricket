import { patchAPI } from '@/actions/actions';
import { Loader } from '@/components/loader/loader';
import { queryClient } from '@/components/providers/query-provider';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { CoinsIcon, UserCircle2Icon } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

type Props = {
  teamId: string;
  teamLogo: string;
  teamName: string;
  playerTeamId: string;
  tossWinnerTeamId: string;
  teamStatus: string;
  teamScore: number;
  teamWicket: number;
  teamBalls: number;
  inning: string;
  winnerTeamId: string;
};

export const TeamDetails = ({
  teamId,
  teamLogo,
  teamName,
  playerTeamId,
  tossWinnerTeamId,
  teamStatus,
  teamScore,
  teamWicket,
  teamBalls,
  inning,
  winnerTeamId,
}: Props) => {
  const params = useParams();

  const mutation = useMutation({
    mutationFn: (data: any) =>
      patchAPI(
        `/api/matches/patchPlayer/${params.tournamentId}/${params.matchId}`,
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

  const handleSelectYourTeamClick = async (playerTeamId: string) => {
    if (!playerTeamId?.length) {
      return toast.error('Please select you team!');
    }

    mutation.mutate({ playerTeamId });
  };

  if (mutation.isPending) {
    return <Loader />;
  }

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-4 px-10 py-4',
          !playerTeamId?.length &&
            'border rounded-lg hover:bg-green-500/50 hover:border-green-500 cursor-pointer'
        )}
        role={!playerTeamId?.length ? 'button' : 'none'}
        onClick={() =>
          !playerTeamId?.length ? handleSelectYourTeamClick(teamId) : {}
        }
      >
        <div className='relative w-16 h-16 md:h-24 md:w-24'>
          <Image
            src={teamLogo}
            alt={teamName}
            className='object-cover rounded-full'
            fill
          />
          {playerTeamId === teamId && (
            <div className='absolute z-10 p-2 rounded-full -right-2 -top-2 bg-secondary'>
              <UserCircle2Icon className='w-5 h-5 text-green-500' />
            </div>
          )}
          {tossWinnerTeamId === teamId && (
            <div className='absolute z-10 p-2 rounded-full -right-2 -top-2 bg-secondary'>
              <CoinsIcon className='w-5 h-5 text-yellow-500' />
            </div>
          )}
        </div>
        <div className='flex items-center gap-2'>
          <h3 className='text-lg font-bold text-center uppercase md:text-2xl'>
            {teamName}
          </h3>
        </div>
        {!playerTeamId?.length && (
          <p className='text-sm text-center text-green-300'>Select Your Team</p>
        )}
      </div>
      {!!teamStatus?.length && (
        <div className='flex flex-col items-center gap-2'>
          <p className='text-4xl font-bold'>
            {teamScore}/{teamWicket}
          </p>
          {inning === 'over' ? (
            teamId === winnerTeamId && (
              <p className='text-4xl font-bold text-green-500'>Winner!</p>
            )
          ) : (
            <p className='text-sm font-semibold text-muted-foreground'>
              ({teamStatus})
              {teamStatus === 'bat' && (
                <span className='ml-1'>{teamBalls} balls remaining</span>
              )}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
