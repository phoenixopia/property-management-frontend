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




const singleMaintenanceData = (maintenanceData : any) => {

    const singleMaintenanceData=maintenanceData?.maintenanceData || ""

  return (
    <div className='flex flex-col p-4 gap-4 '>
        <div className='flex flex-row items-center gap-2'>
            <p className='font-bold'>Applicant Profile</p>
</div>
        <div className='flex flex-row items-center gap-2'>
             <p className='text-sm'>Name:</p>
             <p className='text-sm'> {singleMaintenanceData?.user_id?.first_name?singleMaintenanceData?.user_id?.first_name:"-"}</p>
             <p className='text-sm'> {singleMaintenanceData?.user_id?.middle_name?singleMaintenanceData?.user_id?.middle_name:"-"}</p>
             <p className='text-sm'> {singleMaintenanceData?.user_id?.last_name?singleMaintenanceData?.user_id?.last_name:"-"}</p>
        </div>

            <div className='flex flex-row items-center gap-2'>
            <p className='text-sm'>Applicant Email:</p>
            <p className='text-sm'> {singleMaintenanceData?.user_id?.email?singleMaintenanceData?.user_id?.email:"-"}</p>
            </div>
            <div className='flex flex-row items-center gap-2'>
            <p className='text-sm'>Applicant Phone_number:</p>
            <p className='text-sm'> {(singleMaintenanceData?.user_id?.phone_number?singleMaintenanceData?.user_id?.phone_number:"-")}</p>
            </div>
            <div className='flex flex-row items-center gap-2'>
            <p className='text-sm'>Role:</p>
            {singleMaintenanceData?.user_id?.groups.map((group:any) => (
              <div key={group} className="flex ">
          
                <span
               
                  className="text-sm"
                >
                  {group}
                </span>
              </div>
            ))}
          </div>

          <div className='flex flex-row items-center gap-2'>
            <p className='font-bold'>Property Data</p>
          </div>

            <div className='flex flex-row items-center gap-2'>
            <p className='text-sm'>Property Name:</p>
            <p className='text-sm'> {(singleMaintenanceData?.property_id?.name?singleMaintenanceData?.property_id?.name:"-")}</p>
            </div>
            <div className='flex flex-row items-center gap-2'>
            <p className='text-sm'>Property Address:</p>
            <p className='text-sm'> {(singleMaintenanceData?.property_id?.address?singleMaintenanceData?.property_id?.address:"-")}</p>
            </div>
            <div className='flex flex-row items-center gap-2'>
            <p className='text-sm'>State:</p>
            <p className='text-sm'> {(singleMaintenanceData?.property_id?.state?singleMaintenanceData?.property_id?.state:"-")}</p>
            </div>
            <div className='flex flex-row items-center gap-2'>
            <p className='text-sm'>Zip_code:</p>
            <p className='text-sm'> {(singleMaintenanceData?.property_id?.zip_code?singleMaintenanceData?.property_id?.zip_code:"-")}</p>
            </div>


            <div className='flex flex-row items-center gap-2'>
               <p className='font-bold'>Maintenance Detail</p>
            </div>
            <div className='flex flex-row items-center gap-2'>
            <p className='text-sm'>Requested_at:</p>
            <p className='text-sm'> {(singleMaintenanceData?.requested_at?singleMaintenanceData?.requested_at:"-")}</p>
            </div>
            <div className='flex flex-row items-center gap-2'>
            <p className='text-sm'>Description:</p>
            <p className='text-sm'> {(singleMaintenanceData?.description?singleMaintenanceData?.description:"-")}</p>
            </div>
            <div className='flex flex-row items-center gap-2'>
            <p className='text-sm'>Status:</p>
            <p className='text-sm bg-cyan-400 px-3 py-1 text-black rounded-sm capitalize'> {(singleMaintenanceData?.status?singleMaintenanceData?.status:"-")}</p>
            </div>
            
          
      
    </div>
  );
};

export default singleMaintenanceData;