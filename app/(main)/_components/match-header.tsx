import { updateSkip } from '@/actions/updateSkip';
import { queryClient } from '@/components/providers/query-provider';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

type Props = {
  tournamentId: string;
  matchNo: number;
  tournamentImage: string;
  tournamentName: string;
  winnerTeamId: string;
};

export const MatchHeader = ({
  tournamentId,
  matchNo,
  tournamentImage,
  tournamentName,
  winnerTeamId,
}: Props) => {
  const params = useParams();

  const handleSkipClick = async () => {
    try {
      const res = await updateSkip({
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

  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center justify-start gap-4'>
        <Link href={`/${tournamentId}/all`}>
          <ChevronLeftIcon />
        </Link>
        <div className='relative w-16 h-16'>
          <Image
            src={tournamentImage}
            alt={tournamentName}
            className='object-cover rounded-full'
            fill
          />
        </div>
        <h1 className='uppercase'>{tournamentName}</h1>
        <p className='text-muted-foreground'>#Match {matchNo}</p>
      </div>
      {!winnerTeamId?.length && <Button onClick={handleSkipClick}>Skip</Button>}
    </div>
  );
};
