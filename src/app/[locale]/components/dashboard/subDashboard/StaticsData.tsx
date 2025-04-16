"use client";
import React from 'react';
import { faList, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import LatestAddedTenants from './LatestAddedTenants';
import RevenueBar from './RevenueBar';
import LatestMaintenance from './LatestMaintenance';
import { useQuery } from '@tanstack/react-query';
import { fetchStatistics } from '@/actions/statistics';

ChartJS.register(ArcElement, Tooltip, Legend);

const StaticsData = () => {
  const t2 = useTranslations('full');
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['statistics'],
    queryFn: fetchStatistics
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error loading statistics
      </div>
    );
  }

  // Prepare chart data
  const chartData = {
    labels: [
      t2('occupied-properties'),
      t2('available-properties'),
      t2('properties-under-maintenance')
    ],
    datasets: [
      {
        data: [
          data?.property_status.occupied || 0,
          data?.property_status.available || 0,
          data?.property_status.under_maintenance || 0
        ],
        backgroundColor: ['#01567d', '#426cf5', '#9298a1']
      },
    ],
  };

  return (
    <div>
      <div className="flex mb-2 flex-col md:flex-row items-center bg-gray-100 rounded-lg dark:bg-[#212327] dark:border-gray-700 p-2 min-h-[4rem]">
        <div className='flex flex-col lg:flex-row gap-4 w-full overflow-auto max-h-[28rem] justify-evenly'>
          <div className='flex flex-row items-center dark:bg-gray-600 bg-white px-5 py-2 gap-4 rounded-md shadow-2xl'>
            <span className='text-sm font-bold text-gray-800 dark:text-gray-100'>
              {t2("Total Number Of Properties")}:
            </span>
            <p className='truncate max-w-[200px] text-sm'>{data?.total_properties || 0}</p>
          </div>
          <div className='flex flex-row items-center dark:bg-gray-600 bg-white px-5 py-2 gap-4 rounded-md shadow-2xl'>
            <span className='text-sm font-bold text-gray-800 dark:text-gray-100'>
              {t2("Total Number Of Tenants")}:
            </span>
            <p className='truncate max-w-[200px] text-sm'>{data?.total_tenants || 0}</p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-2'>
        <div className="bg-gray-100 rounded-lg dark:bg-[#212327] dark:border-gray-700 p-2 h-[30rem]">
          <Doughnut 
            data={chartData} 
            options={{ 
              maintainAspectRatio: false, 
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: {
                    color: '#6b7280',
                    font: {
                      size: 12
                    }
                  }
                }
              }
            }} 
          />
        </div>

        <div className="bg-gray-100 rounded-lg dark:bg-[#212327] dark:border-gray-700 p-2 h-[30rem]">
          <RevenueBar revenueData={data?.revenue_bar || {}} />
        </div>

       <div className="flex p-8 items-center justify-center bg-gray-100 rounded-lg dark:bg-[#212327] dark:border-gray-700 h-[30rem]">
          <LatestAddedTenants users={data?.users || []} />
        </div>

        <div className='flex p-8 bg-gray-100 rounded-lg dark:bg-[#212327] dark:border-gray-700 h-[30rem] items-center justify-center'>
          <LatestMaintenance requests={data?.maintenance_requests || []} />
        </div> 
      </div>
    </div>
  );
}

export default StaticsData;