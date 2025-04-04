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
          <span className='text-gray-800 text-center  dark:text-white' >
                {t("select-role")}
              </span>
            <select
              {...form.register("groups")}
              multiple
              className="flex p-3 text-gray-600 dark:text-white bg-gray-100 dark:bg-gray-600 border-gray-300 rounded-lg w-full"
            >
          
              {groupData.isPending ? (
                <option disabled>Loading groups...</option>
              ) : (
                groupData?.data.data?.map((group: any) => (
                  <option
                    key={group.id}
                    className='text-gray-600 dark:text-white py-1'
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
            <>
            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
            processing...
          </>
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