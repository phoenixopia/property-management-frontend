"use client"
import React,{useState} from 'react'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 

const LatestMaintenance = () => {
      const t2 =useTranslations('full')
    
  return (
  

    <div className='flex flex-col w-[28rem]  overflow-auto max-h-[28rem] '>
     <div className='flex flex-row items-center justify-center gap-2'>
     <span className=''>       
         <FontAwesomeIcon icon={faList} className='text-black w-4 dark:text-gray-50 text-2xl'/>
      </span>
      <p className='text-gray-800 dark:text-gray-50 text-sm font-bold '>{t2("latest-maintenance-request")}</p>
     </div>
     <div className='flex flex-row p-4'>
     <div className="inline-block -mx-[0.49rem] w-0.5 self-stretch bg-gray-200 dark:bg-white/10"></div>
     
    <ul className='list-disc ps-5 my-4 space-y-4'>
      <li >
        <div className='flex flex-col font-sm'>
          <p className='text-gray-800 dark:text-gray-50 text-sm font-bold'>10 {t2("minutes")} {t2("ago")}</p>
          <p className=' font-extralight text-gray-500 dark:text-gray-400  capitalize text-[0.75rem] p-1'>tenant x who lives in y address request for z maintainance</p>

       </div>
      </li>
      <li >
        <div className='flex flex-col font-sm'>
          <p className='text-gray-800 dark:text-gray-50  text-sm font-bold'>30 {t2("minutes")} {t2("ago")}</p>
          <p className=' font-extralight text-gray-500 dark:text-gray-400 capitalize text-[0.75rem] p-1'>tenant x who lives in y address request for z maintainance</p>

       </div>
      </li>
      <li >
        <div className='flex flex-col font-sm'>
          <p className='text-gray-800 dark:text-gray-50  text-sm font-bold'>30 {t2("minutes")} {t2("ago")}</p>
          <p className=' font-extralight text-gray-500 dark:text-gray-400 capitalize text-[0.75rem] p-1'>tenant x who lives in y address request for z maintainance</p>

       </div>
      </li>
      <li >
        <div className='flex flex-col font-sm'>
          <p className='text-gray-800 dark:text-gray-50  text-sm font-bold'>30 {t2("minutes")} {t2("ago")}</p>
          <p className=' font-extralight text-gray-500 dark:text-gray-400 capitalize text-[0.75rem] p-1'>tenant x who lives in y address request for z maintainance</p>

       </div>
      </li>
          <li >
        <div className='flex flex-col font-sm'>
          <p className='text-gray-800 dark:text-gray-50  text-sm font-bold'>30 {t2("minutes")} {t2("ago")}</p>
          <p className=' font-extralight text-gray-500 dark:text-gray-400 capitalize text-[0.75rem] p-1'>tenant x who lives in y address request for z maintainance</p>

       </div>
      </li>
      <li >
        <div className='flex flex-col font-sm'>
          <p className='text-gray-800 dark:text-gray-50  text-sm font-bold'>30 {t2("minutes")} {t2("ago")}</p>
          <p className=' font-extralight text-gray-500 dark:text-gray-400 capitalize text-[0.75rem] p-1'>tenant x who lives in y address request for z maintainance</p>

       </div>
      </li>
      <li >
        <div className='flex flex-col font-sm'>
          <p className='text-gray-800 dark:text-gray-50  text-sm font-bold'>30 {t2("minutes")} {t2("ago")}</p>
          <p className=' font-extralight text-gray-500 dark:text-gray-400 capitalize text-[0.75rem] p-1'>tenant x who lives in y address request for z maintainance</p>

       </div>
      </li>
      <li >
        <div className='flex flex-col font-sm'>
          <p className='text-gray-800 dark:text-gray-50  text-sm font-bold'>30 {t2("minutes")} {t2("ago")}</p>
          <p className=' font-extralight text-gray-500 dark:text-gray-400 capitalize text-[0.75rem] p-1'>tenant x who lives in y address request for z maintainance</p>

       </div>
      </li>
      

   
    </ul>

     </div>
    
     
    </div>

  )
}

export default LatestMaintenance