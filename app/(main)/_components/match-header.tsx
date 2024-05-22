import { patchAPI } from '@/actions/actions';
import { queryClient } from '@/components/providers/query-provider';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
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

  const mutation = useMutation({
    mutationFn: (data: any) =>
      patchAPI(
        `/api/matches/patchSkip/${params.tournamentId}/${params.matchId}`,
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

  const handleSkipClick = async () => {
    mutation.mutate({});
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
