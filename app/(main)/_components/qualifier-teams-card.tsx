import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  id: string;
  tournamentId: string;
  title: string;
  teamOneId: string;
  teamOneLogo: string;
  teamOneName: string;
  teamTwoId: string;
  teamTwoLogo: string;
  teamTwoName: string;
  winnerTeamId: string;
};

export const QualifierTeamsCard = ({
  id,
  tournamentId,
  title,
  teamOneId,
  teamOneLogo,
  teamOneName,
  teamTwoId,
  teamTwoLogo,
  teamTwoName,
  winnerTeamId,
}: Props) => {
  return (
    <div className='relative flex items-center justify-center w-full gap-10 p-10 overflow-hidden border rounded-lg border-secondary min-w-96 min-h-48 md:max-w-96'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <div className='relative w-10 h-10 md:h-16 md:w-16'>
          <Image
            src={teamOneLogo}
            alt={teamOneName}
            className='object-cover rounded-full'
            fill
          />
        </div>
        <h3
          className={cn(
            'font-bold text-center uppercase',
            !!winnerTeamId?.length
              ? teamOneId === winnerTeamId
                ? 'text-green-500'
                : 'text-red-500'
              : 'text-foreground'
          )}
        >
          {teamOneName}
        </h3>
      </div>
      <div className='flex flex-col items-center justify-center gap-2'>
        <h1 className='absolute text-lg font-bold text-muted-foreground top-2 left-2'>
          {title}
        </h1>
        <h2 className='font-bold md:text-lg text-secondary-foreground/50'>
          VS
        </h2>
        {!winnerTeamId?.length && (
          <Link
            href={`/${tournamentId}/match/${id}`}
            className='px-4 py-2 text-sm bg-green-500 rounded-lg text-foreground hover:bg-green-500/50'
          >
            Play
          </Link>
        )}
      </div>
      <div className='flex flex-col items-center justify-center gap-4'>
        <div className='relative w-10 h-10 md:h-16 md:w-16'>
          <Image
            src={teamTwoLogo}
            alt={teamTwoName}
            className='object-cover rounded-full'
            fill
          />
        </div>
        <h3
          className={cn(
            'font-bold text-center uppercase',
            !!winnerTeamId?.length
              ? teamTwoId === winnerTeamId
                ? 'text-green-500'
                : 'text-red-500'
              : 'text-foreground'
          )}
        >
          {teamTwoName}
        </h3>
      </div>
    </div>
  );
};
