'use client';

import { getAPI, postAPI } from '@/actions/actions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useModal } from '@/hooks/use-modal-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';
import { Loader } from '../loader/loader';
import { queryClient } from '../providers/query-provider';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

const formSchema = z.object({
  teamId: z.string().min(1, {
    message: 'Team must be required!',
  }),
});

export const AddTeamModal = memo(function AddTeamModal() {
  const params = useParams();

  const { type, isOpen, onClose } = useModal();

  const isModalOpen = isOpen && type === 'addTeam';

  const {
    data: res,
    isLoading: isTeamsLoading,
    isError,
  } = useQuery({
    queryKey: ['teams'],
    queryFn: () => getAPI('/api/teams'),
  });

  const mutation = useMutation({
    mutationFn: (data: any) =>
      postAPI(
        `/api/tournaments/postTournamentTeam/${params.tournamentId}`,
        data
      ),
    onSuccess: (res) => {
      if (!res.success) {
        return toast.error(res.message);
      }

      toast.success(res.message);

      form.reset();

      queryClient.invalidateQueries({ queryKey: ['tournamentTeams'] });

      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamId: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);
  };

  if (isTeamsLoading || mutation.isPending) {
    return <Loader />;
  }

  if (!isModalOpen || isError || !res?.data?.teams?.length) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Team</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='teamId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Name' />
                      </SelectTrigger>
                      <SelectContent position='item-aligned'>
                        {res?.data?.teams?.map((team: any) => (
                          <SelectItem
                            key={team?.id}
                            className='capitalize'
                            value={team?.id}
                          >
                            {team?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' variant='secondary' disabled={isLoading}>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});
