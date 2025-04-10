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




const ViewUserData = ({ userData }: any) => {


 
  return (
    <div className='flex flex-col p-4 gap-4 '>

        <div className='flex flex-row items-center gap-2'>
             <p className='font-bold'>Name:</p>
             <p className='font-bold'> {userData?.first_name?userData?.first_name:"-"}</p>
            <p className=' font-bold'>{userData?.middle_name?userData?.middle_name:'-'}</p>
            <p className=' font-bold'>{userData?.last_name?userData?.last_name:'-'}</p>

        </div>

            <div className='flex flex-row items-center gap-2'>
            <p className='text-sm'>Email:</p>
            <p className='text-sm'> {userData?.email?userData?.email:"-"}</p>
            </div>
            <div className='flex flex-row items-center gap-2'>
            <p className='text-sm'>Phone_number:</p>
            <p className='text-sm'> {(userData?.phone_number?userData?.phone_number:"-")}</p>
            </div>
            <div className='flex flex-row items-center gap-2'>
            <p className='text-sm'>Is_active:</p>
            <p className='text-sm'> {(userData?.is_active).toString()}</p>
            </div>
            <div className='flex flex-row items-center gap-2'>
            <p className='text-sm'>Date_Joined:</p>
            <p className='text-sm'> {(userData?.date_joined).toString()}</p>
            </div>
            <div className='flex flex-row items-center gap-2'>
            <p className='text-sm'>Is_staff:</p>
            <p className='text-sm'> {(userData?.is_staff).toString()}</p>
            </div>


    

      
       <div className='flex justify-center p-2 '>
                 <p className='font-bold'>Current Groups</p>
        </div>
        <hr className="w-full col-span-2 bg-gray-50 text-gray-200 dark:text-gray-500 border-1 dark:bg-gray-700" />

        <div className="grid col-span-2 grid-cols-3 gap-4 max-h-[12rem] overflow-y-auto py-4">
            {userData?.groups.map((group:any) => (
              <div key={group} className="flex items-center w-full">
          
                <span
               
                  className="ms-2 rounded-lg font-medium text-gray-900 dark:text-gray-300 py-1 text-sm"
                >
                  {group}
                </span>
              </div>
            ))}
          </div>
        
        <div className='flex justify-center p-2 '>
                 <p className='font-bold'>Current Permissions</p>
        </div>
        <hr className="w-full col-span-2 bg-gray-50 text-gray-200 dark:text-gray-500 border-1 dark:bg-gray-700" />

        <div className="grid col-span-2 grid-cols-3 gap-4 max-h-[12rem] overflow-y-auto py-4">
            {userData?.user_permissions.map((perm:any) => (
              <div key={perm} className="flex items-center w-full">
          
                <span
               
                  className="ms-2 rounded-lg font-medium text-gray-900 dark:text-gray-300 py-1 text-sm"
                >
                  {perm}
                </span>
              </div>
            ))}
          </div>

      
    </div>
  );
};

export default ViewUserData;