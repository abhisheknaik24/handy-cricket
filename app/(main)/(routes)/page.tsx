'use client';

import { Loader } from '@/components/loader/loader';
import { useModal } from '@/hooks/use-modal-store';
import { useGetTournaments } from '@/hooks/useGetTournaments';
import { PlusIcon } from 'lucide-react';
import { TournamentCard } from '../_components/tournament-card';

const TournamentPage = () => {
  const { onOpen } = useModal();

  const { data: res, isLoading } = useGetTournaments();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='p-4'>
      <div className='flex items-center justify-start gap-4'>
        <h1 className='text-4xl font-bold'>Tournaments</h1>
        <div
          className='p-2 border rounded-lg border-muted-foreground hover:scale-105'
          role='button'
          onClick={() => onOpen('addTournament')}
        >
          <PlusIcon className='w-5 h-5 text-muted-foreground' />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-5 gap-2 mt-4'>
        {!!res?.data?.tournaments?.length &&
          res?.data?.tournaments?.map((tournament: any) => (
            <TournamentCard
              key={tournament?.id}
              id={tournament?.id}
              image={tournament?.image}
              name={tournament?.name}
            />
          ))}
      </div>
    </div>
  );
};

export default TournamentPage;
