import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  id: string;
  tournamentId: string;
  teamOneId: string;
  teamOneLogo: string;
  teamOneName: string;
  teamTwoId: string;
  teamTwoLogo: string;
  teamTwoName: string;
  winnerTeamId?: string;
};

export const MatchCard = ({
  id,
  tournamentId,
  teamOneId,
  teamOneLogo,
  teamOneName,
  teamTwoId,
  teamTwoLogo,
  teamTwoName,
  winnerTeamId,
}: Props) => {
  return (
    <div className='flex items-center justify-between p-4 rounded-lg bg-secondary'>
      <div className='flex items-center gap-4 '>
        <div className='flex items-center gap-2'>
          <div className='relative w-10 h-10'>
            <Image
              src={teamOneLogo}
              alt={teamOneName}
              className='object-cover rounded-full bg-white p-1'
              fill
            />
          </div>
          <p
            className={cn(
              'font-semibold capitalize',
              !!winnerTeamId?.length
                ? teamOneId === winnerTeamId
                  ? 'text-green-500'
                  : 'text-red-500'
                : 'text-foreground'
            )}
          >
            {teamOneName}
          </p>
        </div>
        <p className='font-bold text-secondary-foreground/50'>VS</p>
        <div className='flex items-center gap-2'>
          <div className='relative w-10 h-10'>
            <Image
              src={teamTwoLogo}
              alt={teamTwoName}
              className='object-cover rounded-full'
              fill
            />
          </div>
          <p
            className={cn(
              'font-semibold capitalize',
              !!winnerTeamId?.length
                ? teamTwoId === winnerTeamId
                  ? 'text-green-500'
                  : 'text-red-500'
                : 'text-foreground'
            )}
          >
            {teamTwoName}
          </p>
        </div>
      </div>
      {!!winnerTeamId?.length ? (
        <Link
          href={`/${tournamentId}/match/${id}`}
          className='px-4 py-2 text-sm bg-background rounded-lg text-foreground'
        >
          View
        </Link>
      ) : (
        <Link
          href={`/${tournamentId}/match/${id}`}
          className='px-4 py-2 text-sm bg-green-500 rounded-lg text-foreground hover:bg-green-500/50'
        >
          Play
        </Link>
      )}
    </div>
  );
};
