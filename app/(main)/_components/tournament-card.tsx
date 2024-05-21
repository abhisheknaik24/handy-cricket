import { deleteTournament } from '@/actions/deleteTournament';
import { queryClient } from '@/components/providers/query-provider';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useModal } from '@/hooks/use-modal-store';
import { EditIcon, Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

type Props = {
  id: string;
  image: string;
  name: string;
};

export const TournamentCard = ({ id, image, name }: Props) => {
  const { onOpen } = useModal();

  const handleTournamentDeleteClick = async (id: string) => {
    try {
      const res = await deleteTournament({
        tournamentId: id,
      });

      toast.success(res.message);

      queryClient.invalidateQueries({ queryKey: ['tournaments'] });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <AlertDialog>
      <div className='relative p-4 shadow-sm bg-secondary/50 rounded-xl min-h-60'>
        <Link href={`/${id}/all`}>
          <div className='relative w-full h-60 md:h-40'>
            <Image
              src={image}
              className='object-cover rounded-sm'
              alt={name}
              fill
            />
          </div>
          <h3 className='mt-2 font-semibold uppercase truncate text-muted-foreground'>
            {name}
          </h3>
        </Link>
        <div className='absolute bottom-2 right-2 text-secondary-foreground/50 flex items-center gap-2'>
          <EditIcon
            size={20}
            role='button'
            onClick={() => onOpen('editTournament', { id, image, name })}
          />
          <AlertDialogTrigger>
            <Trash2Icon size={20} role='button' />
          </AlertDialogTrigger>
        </div>
      </div>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete
            tournament.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleTournamentDeleteClick(id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
