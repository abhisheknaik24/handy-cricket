'use client';

import { postMatches } from '@/actions/postMatches';
import { Loader } from '@/components/loader/loader';
import { queryClient } from '@/components/providers/query-provider';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useModal } from '@/hooks/use-modal-store';
import { useGetMatches } from '@/hooks/useGetMatches';
import { useGetTournamentTeams } from '@/hooks/useGetTournamentTeams';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { SidebarItem } from './sidebar-item';

export const Sidebar = () => {
  const params = useParams();

  const { data: tournamentTeamsRes, isLoading: isTournamentTeamsLoading } =
    useGetTournamentTeams();

  const { data: matchesRes, isLoading: isMatchesLoading } = useGetMatches();

  const { onOpen } = useModal();

  const handleMakeMatchesClick = async () => {
    try {
      const res = await postMatches({
        tournamentId: params.tournamentId as string,
      });

      if (!res.status) {
        return toast.error(res.message);
      }

      toast.success(res.message);

      queryClient.invalidateQueries({ queryKey: ['matches'] });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (isTournamentTeamsLoading || isMatchesLoading) {
    return <Loader />;
  }

  return (
    <div className='fixed bottom-0 left-0 z-10 flex flex-col w-full h-screen px-2 py-4 top-10 bg-secondary/50 md:top-0 md:w-72'>
      {!matchesRes?.data?.matches?.length && (
        <>
          <div className='flex flex-col justify-center w-full gap-2'>
            <Button
              className='w-full'
              variant='secondary'
              onClick={() => onOpen('addTeam')}
            >
              Add New Team
            </Button>
            {tournamentTeamsRes?.data?.tournamentTeams?.length >= 8 && (
              <Button variant='outline' onClick={handleMakeMatchesClick}>
                Make Matches
              </Button>
            )}
          </div>
          <Separator className='my-3 bg-foreground/10' />
        </>
      )}
      <div className='w-full h-full overflow-y-auto scrollbar-hide'>
        <h3 className='pl-2 mb-3 text-lg font-semibold text-foreground/90'>
          Teams
        </h3>
        <div className='flex flex-col items-start justify-start w-full h-full gap-2'>
          <SidebarItem
            tournamentId={params.tournamentId as string}
            id='all'
            name='All'
            isActive={params.teamId === 'all'}
          />
          {!!tournamentTeamsRes?.data?.tournamentTeams?.length &&
            tournamentTeamsRes?.data?.tournamentTeams?.map(
              (tournamentTeam: any) => (
                <SidebarItem
                  key={tournamentTeam?.id}
                  tournamentId={tournamentTeam?.tournamentId}
                  id={tournamentTeam?.id}
                  logo={tournamentTeam?.team?.logo}
                  name={tournamentTeam?.team?.name}
                  isActive={params.tournamentTeam === tournamentTeam?.id}
                />
              )
            )}
        </div>
      </div>
    </div>
  );
};
