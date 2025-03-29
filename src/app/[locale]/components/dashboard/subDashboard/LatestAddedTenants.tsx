"use client"
import React,{useState} from 'react'
import { faRectangleList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 

const LatestAddedTenants = () => {
      const t2 =useTranslations('full')
    
  return (
  

    <div className='flex flex-col w-[28rem]  overflow-auto max-h-[28rem]  '>
     <div className='flex flex-row items-center justify-center gap-2'>
     <span className=''>       
         <FontAwesomeIcon icon={faRectangleList} className='text-black w-4 dark:text-gray-50 text-2xl'/>
      </span>
      <p className='text-gray-800 dark:text-gray-50 text-sm font-bold '>{t2('latest-added-tenants')}</p>
     </div>
     <div className='flex flex-row p-4'>
  
     
    <ul className=' ps-5 w-full my-4 space-y-4'>
      <li className='flex w-full bg-white dark:bg-[#38393c] py-2 px-4 rounded-lg' >
        <div className='flex flex-col font-sm'>
          <p className='text-gray-800 dark:text-gray-100 text-sm font-bold'>10/6/2024</p>
          <p className=' font-extralight text-gray-500 dark:text-gray-300  capitalize text-[0.75rem] p-1'>Ababe bekila is added</p>

       </div>
      </li>
      <li className='flex w-full bg-white dark:bg-[#38393c] py-2 px-4 rounded-lg' >
        <div className='flex flex-col font-sm'>
          <p className='text-gray-800 dark:text-gray-100 text-sm font-bold'>10/6/2024</p>
          <p className=' font-extralight text-gray-500 dark:text-gray-300  capitalize text-[0.75rem] p-1'>Ababe bekila is added</p>

       </div>
      </li>
      <li className='flex w-full bg-white dark:bg-[#38393c] py-2 px-4 rounded-lg' >
        <div className='flex flex-col font-sm'>
          <p className='text-gray-800 dark:text-gray-100 text-sm font-bold'>10/6/2024</p>
          <p className=' font-extralight text-gray-500 dark:text-gray-300  capitalize text-[0.75rem] p-1'>Ababe bekila is added</p>

       </div>
      </li>
      <li className='flex w-full bg-white dark:bg-[#38393c] py-2 px-4 rounded-lg' >
        <div className='flex flex-col font-sm'>
          <p className='text-gray-800 dark:text-gray-100 text-sm font-bold'>10/6/2024</p>
          <p className=' font-extralight text-gray-500 dark:text-gray-300  capitalize text-[0.75rem] p-1'>Ababe bekila is added</p>

       </div>
      </li>
      <li className='flex w-full bg-white dark:bg-[#38393c] py-2 px-4 rounded-lg' >
        <div className='flex flex-col font-sm'>
          <p className='text-gray-800 dark:text-gray-100 text-sm font-bold'>10/6/2024</p>
          <p className=' font-extralight text-gray-500 dark:text-gray-300  capitalize text-[0.75rem] p-1'>Ababe bekila is added</p>

       </div>
      </li>
      <li className='flex w-full bg-white dark:bg-[#38393c] py-2 px-4 rounded-lg' >
        <div className='flex flex-col font-sm'>
          <p className='text-gray-800 dark:text-gray-100 text-sm font-bold'>10/6/2024</p>
          <p className=' font-extralight text-gray-500 dark:text-gray-300  capitalize text-[0.75rem] p-1'>Ababe bekila is added</p>

       </div>
      </li>
      <li className='flex w-full bg-white dark:bg-[#38393c] py-2 px-4 rounded-lg' >
        <div className='flex flex-col font-sm'>
          <p className='text-gray-800 dark:text-gray-100 text-sm font-bold'>10/6/2024</p>
          <p className=' font-extralight text-gray-500 dark:text-gray-300  capitalize text-[0.75rem] p-1'>Ababe bekila is added</p>

       </div>
      </li>
      <li className='flex w-full bg-white dark:bg-[#38393c] py-2 px-4 rounded-lg' >
        <div className='flex flex-col font-sm'>
          <p className='text-gray-800 dark:text-gray-100 text-sm font-bold'>10/6/2024</p>
          <p className=' font-extralight text-gray-500 dark:text-gray-300  capitalize text-[0.75rem] p-1'>Ababe bekila is added</p>

       </div>
      </li>
      <li className='flex w-full bg-white dark:bg-[#38393c] py-2 px-4 rounded-lg' >
        <div className='flex flex-col font-sm'>
          <p className='text-gray-800 dark:text-gray-100 text-sm font-bold'>10/6/2024</p>
          <p className=' font-extralight text-gray-500 dark:text-gray-300  capitalize text-[0.75rem] p-1'>Ababe bekila is added</p>

       </div>
      </li>
      <li className='flex w-full bg-white dark:bg-[#38393c] py-2 px-4 rounded-lg' >
        <div className='flex flex-col font-sm'>
          <p className='text-gray-800 dark:text-gray-100 text-sm font-bold'>10/6/2024</p>
          <p className=' font-extralight text-gray-500 dark:text-gray-300  capitalize text-[0.75rem] p-1'>Ababe bekila is added</p>

       </div>
      </li>
      <li className='flex w-full bg-white dark:bg-[#38393c] py-2 px-4 rounded-lg' >
        <div className='flex flex-col font-sm'>
          <p className='text-gray-800 dark:text-gray-100 text-sm font-bold'>10/6/2024</p>
          <p className=' font-extralight text-gray-500 dark:text-gray-300  capitalize text-[0.75rem] p-1'>Ababe bekila is added</p>

       </div>
      </li>
     
     
     
     
     

   
    </ul>

     </div>
    
     
    </div>

  )
}

export default LatestAddedTenants