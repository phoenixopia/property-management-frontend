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




const ViewNotificationData = ({ notificationData }: any) => {


 console.log(notificationData,'not inisde the eye')
  return (
    <div className='flex flex-col p-4 gap-4 text-gray-800 '>

        <div className='flex flex-row items-center gap-2'>
             <p className='font-bold'>Notification_type:</p>
             <p className='font-bold'> {notificationData?.notification_type?notificationData?.notification_type:"-"}</p>
     

        </div>

            <div className='flex flex-row items-center gap-2'>
            <p className='text-sm'>Message:</p>
            <p className='text-sm'> {notificationData?.message?notificationData?.message:"-"}</p>
            </div>
            <div className='flex flex-row items-center gap-2'>
            <p className='text-sm'>created_at:</p>
            <p className='text-sm'> {(notificationData?.created_at?notificationData?.created_at:"-")}</p>
            </div>
            <div className='flex flex-row items-center gap-2'>
            <p className='text-sm'>Is_Read:</p>
            <p className='text-sm'> {(notificationData?.is_read).toString()}</p>
            </div>
          


    

      

        <hr className="w-full col-span-2 bg-gray-50 text-gray-200 dark:text-gray-500 border-1 dark:bg-gray-700" />

        


      
    </div>
  );
};

export default ViewNotificationData;
