"use client"
import React,{useState} from 'react'
import { faList,faUser,faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import LatestAddedTenants from './LatestAddedTenants';
import RevenueBar from './RevenueBar';
import LatestMaintenance from './LatestMaintenance';
ChartJS.register(ArcElement, Tooltip, Legend);


const StaticsData = () => {
  const totalProperties = 5000; 
  const t2=useTranslations('full')
  const data = {
    labels: [`${t2('occupied-properties')}`,`${t2('available-properties')}`],
    datasets: [
      {
       
        data: [1200, 600],
        backgroundColor: [
          '#01567d',
          '#426cf5'
        ]

      },
    ],
    
  };
 
    return (

    <div className=' grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-2  '>

        
        <div className=" bg-gray-100  rounded-lg dark:bg-[#212327] dark:border-gray-700 p-2   h-[30rem]">
            <Doughnut data={data} options={{ maintainAspectRatio: false, responsive: true }} />
          </div>
    

        <div className=" bg-gray-100  rounded-lg dark:bg-[#212327] dark:border-gray-700 p-2   h-[30rem]">
      <RevenueBar />
    </div>
        

    <div className="flex  p-8   items-center justify-center   bg-gray-100  rounded-lg dark:bg-[#212327] dark:border-gray-700   h-[30rem]" 
      >
    
    <LatestAddedTenants/>
    </div>

    <div className='flex  p-8  bg-gray-100  rounded-lg dark:bg-[#212327] dark:border-gray-700    h-[30rem]   items-center justify-center  '>
   <LatestMaintenance/>

    </div>

            
          

    

    
 


</div>

  )
}

export default StaticsData