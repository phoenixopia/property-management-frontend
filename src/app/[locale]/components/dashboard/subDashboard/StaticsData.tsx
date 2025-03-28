"use client"
import React,{useState} from 'react'
import { faList,faUser,faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import LatestAddedTenants from './LatestAddedTenants';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
        labels: ['Occupied Properties','Total Available Properties'],
        datasets: [
          {
           
            data: [1200, 600],
            backgroundColor: [
              'rgba(255, 99, 132, 0.3)',
              'rgba(54, 162, 235, 0.3)'
            ]
          },
        ],
        
      };
const StaticsData = () => {
        const totalProperties = 5000; 
     const t2=useTranslations('full')
    return (

    <div className=' grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-2  '>
   <div className="bg-gray-100  rounded-lg dark:bg-gray-800 dark:border-gray-700 p-2">
        
        <div className="mx-auto   h-[30rem]">
            <Doughnut data={data} options={{ maintainAspectRatio: false, responsive: true }} />
          </div>
        </div>

        

    <div className="flex  p-8   items-center justify-center  rounded-xl" 
      >
    
    <LatestAddedTenants/>
    </div>
            
          

    

    
 


</div>

  )
}

export default StaticsData