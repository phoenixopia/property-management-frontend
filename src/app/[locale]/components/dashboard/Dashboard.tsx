"use client"
import React,{useState} from 'react'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 
const Dashboard = () => {
  const t = useTranslations('Home'); 
  const t2 =useTranslations('full')
  console.log('fro')
  return (
    <div className='flex flex-col justify-between px-2 md:flex-row '>
 

   
 <div className="grid w-full grid-cols-1 lg:grid-cols-3 gap-4 my-4">

<div className="col-span-2  p-4 rounded-xl ">



        <div className=' grid grid-cols-2 gap-4'>

              <div className="   bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                  
                  <div className="flex w-full justify-center bg-red-500  items-center">
                     
                          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white capitalize">number of occupants</h5>
                   

                  </div>
              </div>

         
</div>



</div>



 <div className='sh shadow-lg p-4 rounded-xl'>
  <div className='flex flex-row'>
    <div className='flex flex-col  '>
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

   
    </ul>

     </div>
    
     
    </div>
     
  </div>

  <div className='flex flex-col'>

  </div>
 </div>
</div>

      
    </div>
  )
}

export default Dashboard