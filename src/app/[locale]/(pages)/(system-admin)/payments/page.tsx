
import React from 'react';
import { useTranslations } from 'next-intl'; 



const Page = () => {
  const t = useTranslations('full'); 

  return (
    <div className="flex flex-col p-4 md:ml-60 text-black dark:text-white bg-white dark:bg-[#292a2d] min-h-screen">
     
      <div className="fixed top-0 left-0 right-0 p-4 z-10 bg-white dark:bg-[#292a2d]">
        <div className="flex justify-end items-center">
          <span className="text-black dark:text-gray-300 text-sm font-semibold">{t('payments')}</span>
        </div>
        <hr className="h-px mt-4 bg-gray-200 border-0 dark:bg-gray-700" />
      </div>

      <div className="pt-16 p-6 flex-grow overflow-auto">
  payment Page
      </div>
    </div>
  );
};

export default Page;
