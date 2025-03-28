"use client"
import React,{useState} from 'react'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 
import LatestMaintenance from './subDashboard/LatestMaintenance';
import StaticsData from './subDashboard/StaticsData';
const Dashboard = () => {
  const t = useTranslations('Home'); 
  const t2 =useTranslations('full')
  console.log('fro')
  return (
    <div className='flex flex-col justify-between px-2 3xl:flex-row '>
 

   
 <div className="grid w-full grid-cols-1  gap-4 my-4">




    <StaticsData/>



</div>


<div className='flex  shadow-sm p-8  items-center justify-center xl:w-[50%] rounded-xl'>
   <LatestMaintenance/>


 </div>

      
    </div>
  )
}

export default Dashboard