import { deleteAPI } from '@/actions/actions';
import { Loader } from '@/components/loader/loader';
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
import { useMutation } from '@tanstack/react-query';
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

  const mutation = useMutation({
    mutationFn: (data: any) =>
      deleteAPI(`/api/tournaments/${data?.tournamentId}`),
    onSuccess: (res) => {
      if (!res.success) {
        return toast.error(res.message);
      }

      toast.success(res.message);

      queryClient.invalidateQueries({ queryKey: ['tournaments'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleTournamentDeleteClick = async (id: string) => {
    mutation.mutate({ tournamentId: id });
  };

  if (mutation.isPending) {
    return <Loader />;
  }

  return (
    <AlertDialog>
      <div className='relative p-4 shadow-sm bg-neutral-800 rounded-xl min-h-60'>
        <Link href={`/${id}/all`}>
          <div className='relative w-full h-40'>
            <Image
              src={image}
              className='object-cover rounded-sm'
              alt={name}
              fill
            />
          </div>
          <h3 className='mt-2 text-sm font-semibold uppercase truncate text-neutral-300'>
            {name}
          </h3>
        </Link>
        <div className='absolute flex items-center gap-2 bottom-2 right-2 text-neutral-300'>
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
