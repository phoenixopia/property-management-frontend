import React, { useState } from 'react'

import { useTranslations } from 'next-intl'; 
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { userFormSchema } from "@/lib/zodTypes";
import toast from "react-hot-toast";

import { createUserWithGroups, getAllGroups } from '@/actions/userManagmentAction';




type UserFormValues = z.infer<typeof userFormSchema>;

const AddUserForm = () => {
   const[currentPage,setCurrentPage]=useState(1);
  const t = useTranslations("full");
  const queryClient = useQueryClient();


   const groupData = useQuery({
           queryKey: ["getAllGroupData"],
           queryFn: () => getAllGroups(currentPage),
         });

  

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      middle_name: "",
      email: "",
      password: "",
      groups: [],
    },
  });

  const mutation = useMutation({
    mutationFn: (data: UserFormValues) => 
      createUserWithGroups(
        {
          first_name: data.first_name,
          last_name: data.last_name,
          middle_name: data.middle_name,
          email: data.email,
          password: data.password,
        },
        data.groups
      ),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(t("user-created-successfully"));
        form.reset();
        queryClient.invalidateQueries({ queryKey: ['getAllUserData'] });
      } else {
        toast.error(data.message);
      }
    },
    onError: () => {
      toast.error(t("something-went-wrong"));
    },
  });

  const onSubmit = (data: UserFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 md:p-5">
        <div className="grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2">
            <input
              {...form.register("first_name")}
              type="text"
              className="bg-gray-100 text-gray-600 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder={t("enter-first-name")}
            />
            {form.formState.errors.first_name && (
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.first_name.message}
              </p>
            )}
          </div>
          <div className="col-span-2">
            <input
              {...form.register("last_name")}
              type="text"
              className="bg-gray-100 text-gray-600 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder={t("enter-last-name")}
            />
            {form.formState.errors.last_name && (
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.last_name.message}
              </p>
            )}
          </div>
          <div className="col-span-2">
            <input
              {...form.register("middle_name")}
              type="text"
              className="bg-gray-100 text-gray-600 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder={t("enter-middle-name") + " (Optional)"}
            />
          </div>
          <div className="col-span-2">
            <input
              {...form.register("email")}
              type="email"
              className="bg-gray-100 text-gray-600 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder={t("enter-email")}
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <div className="col-span-2">
            <input
              {...form.register("password")}
              type="password"
              className="bg-gray-100 text-gray-600 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder={t("enter-password")}
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
          <div className="col-span-2">
            <select
              {...form.register("groups")}
              multiple
              className="flex p-3 text-gray-600 dark:text-white bg-gray-100 dark:bg-gray-600 border-gray-300 rounded-lg w-full"
            >
              <option className='text-gray-50 text-center bg-gray-800 dark:text-white' value="">
                {t("select-role")}
              </option>
              {groupData.isPending ? (
                <option disabled>Loading groups...</option>
              ) : (
                groupData?.data.data?.map((group: any) => (
                  <option
                    key={group.id}
                    className='text-gray-600 dark:text-white'
                    value={group.name}
                  >
                    {group.name}
                  </option>
                ))
              )}
            </select>
            {form.formState.errors.groups && (
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.groups.message}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="cursor-pointer text-white inline-flex items-center bg-blue-400 hover:bg-blue-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? (
            <span>Creating...</span>
          ) : (
            <>
              <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
              </svg>
              {t("add-user")}
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;