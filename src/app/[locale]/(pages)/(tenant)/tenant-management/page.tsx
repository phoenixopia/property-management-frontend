import React from 'react';
import Dashboard from '../../../components/dashboard/Dashboard';
import { useTranslations } from 'next-intl'; 
import MaintenanceManagment from '../../../components/maintenance-managment/MaintenanceManagment';


const page = () => {
        const t = useTranslations('Dashboard'); 
    
  return (
    <div className=" md:ml-64 text-black dark:text-gray-300 bg-white dark:bg-[#292a2d] min-h-screen ">
        <div className="fixed top-0 left-0 right-0   bg-white dark:bg-[#292a2d]">
        <div className="flex justify-end items-center py-4 px-12">
          <span className="text-black  dark:text-gray-300 text-sm font-semibold">{t('tenant-page')}</span>
        </div>
        <hr className="h-px mt-4 bg-gray-200 border-0 dark:bg-gray-700" />
      </div>

      
      <div className="pt-16 p-6 flex-grow overflow-auto">
             <p>tenant page</p>
   
      </div>
    </div>

  )
}

export default page