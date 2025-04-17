import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useMutation,useQueryClient } from '@tanstack/react-query';
import { updateRole, fetchPermissions } from '@/actions/roleAndPermissions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
interface Permission {
  id: string;
  label: string;
}

interface EditRoleFormProps {
  roleId: number;
  currentName: string;
  currentPermissions: string[];
}

// Define Zod schema for form validation
const editRoleSchema = z.object({
  roleName: z.string().min(1, "Role name is required"),
  permissions: z.array(z.string()).min(1, "At least one permission is required"),
});

type EditRoleFormValues = z.infer<typeof editRoleSchema>;

const ViewRoleForm = ({ roleId, currentName, currentPermissions }: EditRoleFormProps) => {



 
  return (
    <div className='flex flex-col p-4 gap-2 '>

        <div className='flex flex-row items-center gap-2'>
             <p className='font-bold'>Role Name:</p>
            <p className='bg-gray-200 dark:text-black py-1 rounded-lg px-7 text-sm'>{currentName}</p>
        </div>

        
        <div className='flex justify-center p-2 py-4'>
                 <p className='font-bold'>Current Permissions</p>
        </div>
        <hr className="w-full col-span-2 bg-gray-50 text-gray-200 dark:text-gray-500 border-1 dark:bg-gray-700" />

        <div className="grid col-span-2 grid-cols-3 gap-4 max-h-[12rem] overflow-y-auto py-4">
            {currentPermissions.map((perm,id:any) => (
         
          
                <span
                 key={id}
                  className="flex truncate overflow-auto  rounded-lg font-medium text-gray-900 dark:text-gray-300 text-sm"
                >
                  {perm}
                </span>
          
            ))}
          </div>

      
    </div>
  );
};

export default ViewRoleForm;