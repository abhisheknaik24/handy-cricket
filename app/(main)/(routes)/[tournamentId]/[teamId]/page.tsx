'use client';

import { Matches } from '@/app/(main)/_components/matches';
import { PointsTable } from '@/app/(main)/_components/points-table';
import { Qualifier } from '@/app/(main)/_components/qualifier';
import { Sidebar } from '@/app/(main)/_components/sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ChevronLeftIcon, MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const TeamPage = () => {
  const [tab, setTab] = useState('matches');

  return (
    <div className='w-full h-full'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-start w-full gap-2'>
          <Link href='/'>
            <ChevronLeftIcon />
          </Link>
          <Button
            variant={tab === 'matches' ? 'default' : 'outline'}
            onClick={() => setTab('matches')}
          >
            Matches
          </Button>
          <Button
            variant={tab === 'points-table' ? 'default' : 'outline'}
            onClick={() => setTab('points-table')}
          >
            Points Table
          </Button>
          <Button
            variant={tab === 'qualifier' ? 'default' : 'outline'}
            onClick={() => setTab('qualifier')}
          >
            Qualifier
          </Button>
        </div>
        <div className='block md:hidden'>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='secondary'>
                <MenuIcon size={25} />
              </Button>
            </SheetTrigger>
            <SheetContent className='w-full p-0 bg-secondary' side='left'>
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {tab === 'matches' && <Matches />}
      {tab === 'points-table' && <PointsTable />}
      {tab === 'qualifier' && <Qualifier />}
    </div>
  );
};

export default TeamPage;
