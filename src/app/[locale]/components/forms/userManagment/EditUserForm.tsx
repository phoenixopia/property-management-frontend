"use client"
import React, { useState, useEffect } from 'react'
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { fetchPermissions } from '@/actions/roleAndPermissions';
import { fetchGroups } from '@/actions/roleAndPermissions';
import { updateUser } from '@/actions/userManagmentAction';
import toast from 'react-hot-toast';

// Define Zod schema for form validation
const userSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().optional(),
  email: z.string().email("Invalid email address"),
  groups: z.array(z.string()).optional(),
  user_permissions: z.array(z.string()).optional()
});

type UserFormData = z.infer<typeof userSchema>;

interface EditUserFormProps {
  userId: string;
  initialData: {
    first_name?: string;
    last_name?: string;
    email: string;
    groups?: string[];
    user_permissions?: string[];
  };
  onSuccess?: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ userId, initialData, onSuccess }) => {
  const t = useTranslations("full");
  const queryClient = useQueryClient();
  
  // Fetch permissions and groups
  const { data: permissions = [] } = useQuery({
    queryKey: ['permissions'],
    queryFn: fetchPermissions
  });

  const { data: groups = [], isLoading: groupsLoading } = useQuery({
    queryKey: ['groups'],
    queryFn: fetchGroups
  });

  // Initialize form with react-hook-form and zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      user_permissions: initialData.user_permissions || []
    }
  });

  // Initialize form with data once groups are loaded
  useEffect(() => {
    if (!groupsLoading && groups) {
      reset({
        ...initialData,
        // Convert initial group names to IDs for the form
        groups: initialData.groups?.map(groupName => {
          const foundGroup = groups.find((g: any) => g.name === groupName);
          return foundGroup?.id || '';
        }).filter(Boolean) || [],
        // Ensure user_permissions is always an array
        user_permissions: initialData.user_permissions || []
      });
    }
  }, [groups, groupsLoading, initialData, reset]);

  const prepareSubmitData = (data: UserFormData) => {
    const selectedGroupNames = data.groups?.map(groupId => {
      const group = groups.find((g: any) => g.id === groupId);
      return group?.name || '';
    }).filter(Boolean) || [];

    // Special handling for empty permissions array
    const userPermissions = data.user_permissions || [];
    const finalPermissions = userPermissions.length === 0 ? [""] : userPermissions;

    return {
      ...data,
      groups: selectedGroupNames,
      user_permissions: finalPermissions
    };
  };

  // Mutation for updating user
  const updateUserMutation = useMutation({
    mutationFn: (data: UserFormData) => {
      const preparedData = prepareSubmitData(data);
      return updateUser(userId, preparedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllUserData'] });
      onSuccess?.();
      toast.success(t("successfully-updated-user"))
    }
  });

  // Handle form submission
  const onSubmit = (data: UserFormData) => {
    updateUserMutation.mutate(data);
  };

  // Toggle permission selection
  const togglePermission = (permissionId: string) => {
    const currentPermissions = watch('user_permissions') || [];
    const newPermissions = currentPermissions.includes(permissionId)
      ? currentPermissions.filter(id => id !== permissionId)
      : [...currentPermissions, permissionId];
    
    setValue('user_permissions', newPermissions);
  };

  // Get permissions from selected groups
  const getGroupPermissions = (groupIds: string[] = []) => {
    return groupIds.flatMap(groupId => {
      const group = groups.find((g: any) => g.id === groupId);
      return group ? group.permissions : [];
    });
  };

  const selectedGroups = watch('groups') || [];
  const groupPermissions = getGroupPermissions(selectedGroups);
  const selectedPermissions = watch('user_permissions') || [];

  if (groupsLoading) {
    return <div>Loading groups...</div>;
  }

  return (
    <div>
      <form className="p-4 md:p-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2">
            <input 
              type="text" 
              {...register('first_name')}
              className={`bg-gray-100 text-gray-600 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${errors.first_name ? 'border-red-500' : ''}`}
              placeholder={t("enter-first-name")}
            />
            {errors.first_name && (
              <p className="mt-1 text-sm text-red-600">{errors.first_name.message}</p>
            )}
          </div>
          
          <div className="col-span-2">
            <input 
              type="text" 
              {...register('last_name')}
              className="bg-gray-100 text-gray-600 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder={t("enter-last-name")}
            />
          </div>
          
          <div className="col-span-2">
            <input 
              type="email" 
              {...register('email')}
              className={`bg-gray-100 text-gray-600 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${errors.email ? 'border-red-500' : ''}`}
              placeholder={t("enter-email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="col-span-2">
          <span className='text-gray-600 dark:text-white' >
                {t("select-role")}
              </span>
            <select
              value={selectedGroups}
              onChange={(e) => {
                const options = Array.from(e.target.selectedOptions, option => option.value);
                setValue('groups', options);
              }}
              className="flex p-3 text-gray-600 dark:text-white bg-gray-100 dark:bg-gray-600 border-gray-300 rounded-lg w-full"
              multiple
            >
            
              {groups.map((group: any) => (
                <option 
                  key={group.id} 
                  value={group.id}
                  className='text-gray-600 dark:text-white'
                >
                  {group.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className='flex col-span-2 items-center justify-center'>
            <span className='text-gray-600 capitalize dark:text-gray-400 font-bold'>
              {t("permissions")}
            </span>
          </div>

          <hr className="w-full col-span-2 bg-gray-50 text-gray-200 dark:text-gray-500 border-1 dark:bg-gray-700"/>
          
          <div className="grid col-span-2 grid-cols-3 gap-4 max-h-[18rem] overflow-y-auto">
            {permissions.map((permission: any) => {
              const isFromGroup = groupPermissions.includes(permission.id);
              const isSelected = selectedPermissions.includes(permission.id) || isFromGroup;
              
              return (
                <div key={permission.id} className="flex items-center w-full">
                  <input
                    id={`perm-${permission.id}`}
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => !isFromGroup && togglePermission(permission.id)}
                    disabled={isFromGroup}
                    className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${isFromGroup ? 'opacity-50 cursor-not-allowed' : ''}`}
                  />
                  <label 
                    htmlFor={`perm-${permission.id}`}
                    className={`ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 ${isFromGroup ? 'text-blue-500 dark:text-blue-400' : ''}`}
                  >
                    {permission.label}
                    {isFromGroup && <span className="text-xs ml-1">(from group)</span>}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        
        <button 
          type="submit"
          disabled={updateUserMutation.isPending}
          className="cursor-pointer text-white inline-flex items-center bg-blue-400 hover:bg-blue-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {updateUserMutation.isPending ? (
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
              {t("edit-user")}
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default EditUserForm;