"use client"
import React,{useState} from 'react'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 

const TotalNumber = () => {
      const t2 =useTranslations('full')
    
  return (
  

    <div className='flex flex-col lg:flex-row gap-4 w-full  overflow-auto max-h-[28rem] justify-evenly'>
        <div className='flex flex-row items-center dark:bg-gray-600 bg-white px-5 py-2 gap-4 rounded-md shadow-2xl'>
            <span className='text-sm font-bold text-gray-800 dark:text-gray-100'>
                Total Number Of Properties:
            </span>

            <p className='truncate max-w-[200px] text-sm'>125</p>
        </div>
        <div className='flex flex-row items-center dark:bg-gray-600 bg-white px-5 py-2 gap-4 rounded-md shadow-2xl'>
        <span className='text-sm font-bold text-gray-800  dark:text-gray-100'>
                Total Number Of Tenants:
            </span>

            <p className='truncate max-w-[200px] text-sm'>12</p>
        </div>

     
    </div>

  )
}

export default TotalNumber