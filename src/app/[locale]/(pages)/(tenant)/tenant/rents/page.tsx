import React from 'react';

import { useTranslations } from 'next-intl'; 

import TenantRents from '@/app/[locale]/components/tenant-rents/TenantRents';

const page = () => {
    const t = useTranslations('Dashboard'); 
    const t2 = useTranslations('full'); 

  
  return (
    <div className=" md:ml-60 text-black dark:text-gray-300 bg-white dark:bg-[#292a2d] min-h-screen ">
        <div className="fixed top-0 left-0 right-0 z-10   bg-white dark:bg-[#292a2d]">
        <div className="flex justify-end items-center py-4 px-12">
          <span className="text-black  dark:text-gray-300 text-sm font-semibold">{t2('rent-management')}</span>
        </div>
        <hr className="h-px mt-4 bg-gray-200 border-0 dark:bg-gray-700" />
      </div>

      
      <div className="pt-16 p-6 flex-grow overflow-auto">

        <TenantRents />
      </div>
    </div>




  );
}

export default page;
