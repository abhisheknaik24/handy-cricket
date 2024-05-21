'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  tournamentId: string;
  id: string;
  logo?: string;
  name: string;
  isActive: boolean;
};

export const SidebarItem = ({
  tournamentId,
  id,
  logo,
  name,
  isActive,
}: Props) => {
  return (
    <Link
      href={`/${tournamentId}/${id}`}
      className={cn(
        'flex items-center justify-between w-full gap-2 px-4 py-2 rounded-md',
        isActive ? 'bg-secondary/90' : 'hover:bg-secondary/90'
      )}
    >
      <div className='flex items-center justify-start gap-2'>
        {!!logo?.length ? (
          <div className='relative w-10 h-10'>
            <Image
              src={logo}
              alt={name}
              className='object-cover rounded-full bg-white p-1'
              fill
            />
          </div>
        ) : (
          <div className='relative flex items-center justify-center w-10 h-10 rounded-full bg-sky-300/90'>
            <p className='text-lg font-semibold uppercase text-sky-700'>
              {name.charAt(0)}
            </p>
          </div>
        )}
        <h3 className='capitalize text-foreground/50'>{name}</h3>
      </div>
    </Link>
  );
};
