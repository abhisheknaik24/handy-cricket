'use client';

import { patchAPI } from '@/actions/actions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModal } from '@/hooks/use-modal-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { memo, useEffect } from 'react';
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
import { Input } from '../ui/input';
import { ImageUpload } from '../upload/image-upload';

const formSchema = z.object({
  image: z.string().min(1, {
    message: 'Tournament image must be required!',
  }),
  name: z.string().min(1, {
    message: 'Tournament name must be required!',
  }),
});

export const EditTournamentModal = memo(function EditTournamentModal() {
  const { type, isOpen, data: tournament, onClose } = useModal();

  const isModalOpen = isOpen && type === 'editTournament';

  const mutation = useMutation({
    mutationFn: (data: any) =>
      patchAPI(`/api/tournaments/${tournament.id}`, data),
    onSuccess: (res) => {
      if (!res.success) {
        return toast.error(res.message);
      }

      toast.success(res.message);

      form.reset();

      queryClient.invalidateQueries({ queryKey: ['tournaments'] });

      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: '',
      name: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);
  };

  useEffect(() => {
    if (!!tournament?.image?.length && !!tournament?.name?.length) {
      form.setValue('image', tournament.image);

      form.setValue('name', tournament.name);
    }
  }, [form, tournament]);

  if (mutation.isPending) {
    return <Loader />;
  }

  if (!isModalOpen) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Tournament {tournament.name}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Name' disabled={isLoading} {...field} />
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
