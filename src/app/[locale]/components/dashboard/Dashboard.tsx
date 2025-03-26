import React from 'react'
import { useTranslations } from 'next-intl'; // declare this import
const Dashboard = () => {
  const t = useTranslations('Home'); 
  return (
    <div className='flex flex-col justify-between px-2 md:flex-row'>
      <div>
            <h1>{t('title')}</h1>
        </div>

        <div>
                  <hr className="h-px mt-4  bg-gray-200 border-0 dark:bg-gray-400"/>
            
        </div>
   
        {/* <div className='flex flex-col justify-between md:flex-row'>

            
            <div className="block max-w-sm p-6 shadow-2xs bg-white border border-gray-200 rounded-lg dark:bg-gray-400 dark:border-gray-600">

            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Number Of Property</h5>
            <p className="font-normal text-gray-700 dark:text-gray-200">23</p>
            </div>

            <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm  dark:bg-gray-400 dark:border-gray-600">

            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Number Of Property</h5>
            <p className="font-normal text-gray-700 dark:text-gray-200">23</p>
            </div>

            <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm  dark:bg-gray-400 dark:border-gray-600">

            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Number Of Property</h5>
            <p className="font-normal text-gray-700 dark:text-gray-200">23</p>
            </div>

            <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm  dark:bg-gray-400 dark:border-gray-600">

            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Number Of Property</h5>
            <p className="font-normal text-gray-700 dark:text-gray-200">23</p>
            </div>

            </div>
    */}
      
    </div>
  )
}

export default Dashboard