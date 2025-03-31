"use client"
import React,{useState} from 'react'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 
import LatestMaintenance from './subDashboard/LatestMaintenance';
import StaticsData from './subDashboard/StaticsData';
import { withAuth } from '@/hooks/withAuth';
const Dashboard = () => {
  const t = useTranslations('Home'); 
  const t2 =useTranslations('full')

  return (
    <div className='flex flex-col justify-between px-2 3xl:flex-row '>
 

   
 <div className="grid w-full grid-cols-1  gap-4 my-4">




    <StaticsData/>



</div>



      
    </div>
  )
}

export default withAuth(Dashboard, ["new group 3", "group 2"], ["pms.view_tenant", "pms.ednant"]);
