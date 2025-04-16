"use client";
import React from 'react';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl'; 

interface MaintenanceRequest {
  id: number;
  description: string;
  requested_at: string;
  status: string;
  property_id: {
    name: string;
  };
  user_id: {
    first_name: string;
    last_name: string;
  };
}

interface LatestMaintenanceProps {
  requests: MaintenanceRequest[];
}

const LatestMaintenance = ({ requests }: any) => {
  const t2 = useTranslations('full');
   console.log(requests,'rrrrr')
  return (
    <div className='flex flex-col w-[28rem] overflow-auto max-h-[28rem]'>
      <div className='flex flex-row items-center justify-center gap-2'>
        <span className=''>       
          <FontAwesomeIcon icon={faList} className='text-black w-4 dark:text-gray-50 text-2xl'/>
        </span>
        <p className='text-gray-800 dark:text-gray-50 text-sm font-bold '>
          {t2("latest-maintenance-request")}
        </p>
      </div>
      
      <div className='flex flex-row p-4'>
        {/* <div className="inline-block -mx-[0.49rem] w-0.5 self-stretch bg-gray-200 dark:bg-white/10"></div> */}
        
        <ul className='list-disc ps-5 my-4 space-y-4'>
          {requests.map((request:any) => (
            <li key={request.id}>
              <div className='flex flex-col font-sm'>
                <p className='text-gray-800 dark:text-gray-50 text-sm font-bold'>
                  {new Date(request.requested_at).toLocaleDateString()}
                </p>
                <p className='font-extralight text-gray-500 dark:text-gray-400 capitalize text-[0.75rem] p-1'>
                  {request.user_id.first_name || 'Tenant'} who lives in {request.property_id.name} requested: {request.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LatestMaintenance;