"use client"
import React from 'react'
import ThemeToggle from '@/app/[locale]/components/theme/theme-toggle'
import Language from '@/app/[locale]/components/language/Language'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withAuth } from '@/hooks/withAuth';

import { faLanguage,faCircleHalfStroke} from '@fortawesome/free-solid-svg-icons'
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 

const page = () => {
     
      const t = useTranslations('full'); 
      const t2 = useTranslations('Dashboard'); 

  return (
    <div className="p-4 md:ml-60 text-black dark:text-white bg-white dark:bg-[#292a2d] min-h-screen overflow-hidden">
    <div className='flex  flex-col '>
    <div className="fixed top-0 left-0 right-0 p-4 z-10 bg-white dark:bg-[#292a2d]">
        <div className="flex justify-end items-center">
          <span className="text-black  dark:text-gray-300 text-sm font-semibold">{t2('setting')}</span>
        </div>
        <hr className="h-px mt-4 bg-gray-200 border-0 dark:bg-gray-700" />
      </div>
      <div className="pt-16 p-6 flex-grow ">
     


      <div className='flex flex-col gap-8   p-4'>
        <div className='flex items-center gap-2'>
        <FontAwesomeIcon icon={faCircleHalfStroke} className="flex flex-row  text-xl dark:text-gray-400 text-gray-600"/>

         <span className='text-black dark:text-white text-sm'>{t("change-theme")}</span> 
         <ThemeToggle/>
        </div>
         
       
       <div className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faLanguage} className="flex flex-row text-xl dark:text-gray-400 text-gray-600"/>
           
           <span className='text-black dark:text-white text-sm'>{t("multi-language")}</span> 
            <Language/>
        </div>
      </div>


     </div>

      
    </div>

    
    </div>
  )
}


export default withAuth(page, ["maintenance", "system-admin","tenant"],["pms.view_maintenancerequest","pms.view_rent"]);

