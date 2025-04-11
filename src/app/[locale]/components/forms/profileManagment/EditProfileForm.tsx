'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation,useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { createUserProfilePic } from '@/actions/profileManagmentAction';
import toast from 'react-hot-toast';

const schema = z.object({
   profile_picture: z
     .any()
     .refine((files) => files instanceof FileList, "Expected FileList")
     .refine((files) => files.length === 1, "Image is required"),
 });

type FormData = z.infer<typeof schema>;

const EditProfileForm = () => {
  const t = useTranslations('full');
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const formData = new FormData();
      formData.append('profile_picture', data.profile_picture[0]);
      return await createUserProfilePic(formData);
    },
    onSuccess: () => {
      toast.success('Profile picture updated!');
      queryClient.invalidateQueries({ queryKey: ['profileData'] });

    },
    onError: () => {
      toast.error('Failed to update profile picture.');
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5">
        <div className="grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2">
            <input
              type="file"
              accept="image/*"
              {...register('profile_picture')}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {errors.profile_picture && (
              <p className="text-red-500 text-sm mt-1">{errors.profile_picture.message}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="cursor-pointer text-white inline-flex items-center bg-blue-400 hover:bg-blue-500 disabled:opacity-50 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          {mutation.isPending ? 'Uploading...' : t('update')}
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
